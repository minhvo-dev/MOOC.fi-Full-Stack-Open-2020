import express from "express";
import cors from "cors";

import diagnosisRouter from "./routes/diagnosis";
import patientRouter from "./routes/patients";

const app = express();
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});