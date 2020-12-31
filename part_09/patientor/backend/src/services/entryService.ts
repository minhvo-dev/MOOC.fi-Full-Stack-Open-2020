import patients from "../../data/patients";
import { NewEntry, Entry, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

const addEntryToPatient = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Invalid patient id: ${id}`);
  }
  const newEntry: Entry = {
    ...entry,
    id: uuidv4()
  };
  patient.entries = [
    ...patient.entries,
    newEntry
  ];
  return patient;
};

export default {
  addEntryToPatient
};