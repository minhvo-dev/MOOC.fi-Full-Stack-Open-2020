import express from "express";
import patientService from "../services/patientService";
import entryService from "../services/entryService";
import { getNewEntryFromObject, getPatientFromObject } from "../utils";

const router = express.Router();

// GET: return all public patient information
router.get("/", (_req, res) => {
  res.send(patientService.getPublicEntries());
});

// POST: add patient information to database
router.post("/", (req, res) => {
  try {
    const newPatientEntry = getPatientFromObject(req.body);
    const addedPatientEntry = patientService.addEntry(newPatientEntry);
    res.json(addedPatientEntry);
  }
  catch (error) {
    const { message } = error as Error;
    res
      .status(400)
      .send(message);
  }
});

// GET: return a specific patient by id
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getEntryById(id);
    res.json(patient);
  }
  catch (error) {
    const { message } = error as Error;
    res
      .status(400)
      .send(message);
  }
});

// POST: add an entry to a specific patient by id
router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = getNewEntryFromObject(req.body);
    const updatedPatient = entryService.addEntryToPatient(id, newEntry);
    res.json(updatedPatient);
  }
  catch (error) {
    const { message } = error as Error;
    res
      .status(400)
      .send(message);
  }
});

export default router;