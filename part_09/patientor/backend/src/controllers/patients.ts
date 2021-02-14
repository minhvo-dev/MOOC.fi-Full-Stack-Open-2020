import express from "express";

import Patient from "../models/patient";
import Entry from "../models/entry";

const router = express.Router();

// GET: all the patients
router.get("/", async (_request, response, next) => {
  try {
    const patients = await Patient.find({}, {
      id: 1,
      name: 1,
      dateOfBirth: 1,
      gender: 1,
      occupation: 1,
      ssn: 1
    });
    response.json(patients);
  }
  catch (error) {
    next(error);
  }
});

// POST: add new patient
router.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const patient = new Patient({ ...body });
    const savedPatient = await patient.save();
    response.json(savedPatient);
  }
  catch (error) {
    next(error);
  }
});

// GET: get the information of a specific patient
router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const patient = await Patient.findById(id).populate("entries");

    response.json(patient);
  }
  catch (error) {
    next(error);
  }
});

// POST: add new entry to the current patient
router.post("/:id/entries", async (request, response, next) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const patient = await Patient.findById(id);

    if (!patient) {
      response.status(404).send({
        message: `Cannot find the patient ${id}`
      });
    }
    else {
      const entry = new Entry({ ...body });
      entry.user = id;
      const savedEntry = await entry.save();

      patient.entries = patient.entries.concat(savedEntry._id);
      const savedPatient = await patient.save();

      response.json(savedPatient);
    }
  }
  catch (error) {
    next(error);
  }
});

export default router;