import express, { NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./configs";
// import diagnosisRouter from "./routes/diagnosis";
// import patientRouter from "./routes/patients";
import diagnosisRouter from "./controllers/diagnosis";
import patientRouter from "./controllers/patients";

const app = express();

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB", error);

  });

app.use(cors()); // accept requests from all origins
app.use(express.json()); // parse requests to jsons

// GET: ping endpoint
app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.send("pong");
});

// diagnosis route
app.use("/api/diagnosis", diagnosisRouter);

// patient route
app.use("/api/patients", patientRouter);

// unknown endpoint
app.use((_request, response) => {
  response.status(404).send({
    message: "unknown endpoint"
  });
})

// error handler
app.use((
  error: any,
  _request: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  console.log(error);
  if (error.name === "CastError") {
    return response.status(400).end();
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({
      message: error.message
    });
  }
  next(error);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});