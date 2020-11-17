const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {  // error
  console.log("Use: note mongo.js <password> <name*> <number*>");
  process.exit(1);
}

const password = process.argv[2];
const dbname = "phonebook";
const url = `mongodb+srv://fullstack:${password}@project0.hftwx.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) { // print all records to the console
  Person.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(person => {
      console.log(person.name, person.number);
      mongoose.connection.close();
    });
  });
}
else { // add new person to the database
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}