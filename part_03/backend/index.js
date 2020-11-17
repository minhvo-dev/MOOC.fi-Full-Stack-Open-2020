const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); // for printing requests to console
const cors = require("cors");
require("dotenv").config(); // for using environment variables
const Person = require("./models/person");


const app = express();

app.use(cors()); // for request from all origins

app.use(bodyParser.json()); // for parsing body from request to json

app.use(express.static("build"));

// morgan for all request but POST
app.use(morgan("tiny", {
  skip: (request,) => { return request.method === "POST"; }
}));

// morgan for only POST request
app.use(morgan((tokens, req, res) => {
  if (tokens.method(req) === "POST") {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"), "-",
      tokens["response-time"](req, res), "ms",
      JSON.stringify(req.body)
    ].join(" ");
  }
}));

// let people = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   }
// ];

// GET: all people
app.get("/api/people", (request, response, next) => {
  Person
    .find({})
    .then(people => people.map(person => person.toJSON()))
    .then(formattedPeople => {
      response.json(formattedPeople);
    })
    .catch(error => next(error));
});

// GET: info
app.get("/info", (request, response, next) => {
  Person
    .find({})
    .then(people => {
      response.send(
        `<div>Phonebook has info of ${people.length} people</div>
        <div>${new Date()}</div>`
      );
    })
    .catch(error => next(error));
});

// GET: specified person
app.get("/api/people/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // const person = people.find(p => p.id === id);
  // if (person) {
  //   response.json(person);
  // }
  // else {
  //   response.status(404).end();
  // }

  const id = request.params.id;
  Person
    .findById(id)
    .then(person => person.toJSON())
    .then(formattedPerson => {
      response.json(formattedPerson);
    })
    .catch(error => next(error));
});

// DELETE: specified person
app.delete("/api/people/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // if (people.find(person => person.id === id)) {
  //   people = people.filter(person => person.id !== id);
  //   response.status(204).end();
  // }
  // else {
  //   response.status(404).end();
  // }

  const id = request.params.id;
  Person
    .findByIdAndRemove(id)
    .then(result => {
      if (result) {
        response.status(204).end();
      }
      else {
        response.status(400).send({
          error: `Person with id: ${id} was already removed`
        });
      }
    })
    .catch(error => next(error));

});

// POST: add new person
app.post("/api/people", (request, response, next) => {
  const body = request.body;
  // reject if either name or number is missing
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: "name is missing"
  //   });
  // }
  // if (!body.number) {
  //   return response.status(400).json({
  //     error: "number is missing"
  //   });
  // }
  // if (people.find(person => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   });
  // }

  // create new person and add to people
  const newPerson = new Person({
    name: body.name,
    number: body.number
  });
  newPerson
    .save()
    .then(person => person.toJSON())
    .then(formattedPerson => {
      response.json(formattedPerson);
    })
    .catch(error => next(error));

  // const newPerson = {
  //   name: body.name,
  //   number: body.number,
  //   id: getNewID()
  // }
  // people = people.concat(newPerson);

  // response.json(newPerson);
});

// PUT: update an existing person
app.put("/api/people/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;
  Person
    .findById(id)
    .then(person => {
      const newInfo = {
        name: person.name,
        number: body.number
      };

      Person
        .findByIdAndUpdate(id, newInfo, {
          new: true, // {new: true} to get the updated person info
          runValidators: true,
          context: "query"
        })
        .then(updatedPerson => updatedPerson.toJSON())
        .then(formattedPerson => {
          response.json(formattedPerson);
        })
        .catch(error => next(error));

    })
    .catch(error => next(error));

});

// const MAX_ID = 1_000_000;
// /**
//  * Return a new ID that less than MAX_ID
//  * (hopefully the new ID is unique)
//  */
// const getNewID = () => {
//   return Math.ceil(Math.random() * MAX_ID);
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint"
  });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformed id"
    });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({
      error: error.message
    });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Phonebook backend is running on port ${PORT}`);
});
