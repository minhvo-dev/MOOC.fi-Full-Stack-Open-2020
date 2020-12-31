import { Patient, PublicPatient, NewPatient } from "../types";
import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getPublicEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation }));
};

const addEntry = (entry: NewPatient): PublicPatient => {
  const newPatientEntry = {
    ...entry,
    id: uuidv4()
  };
  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const { ssn, entries, ...returnObject } = newPatientEntry;
  return returnObject;
};

/**
 * Find the patient based on their id.
 * Return patient object if found; otherwise, throw an Error
 * @param id id of the patient
 */
const getEntryById = (id: string): Patient => {
  const entry = patients.find(patient => patient.id === id);
  if (entry) {
    return entry;
  }
  throw new Error(`Invalid ID: ${id}`);
};

export default {
  getEntries,
  getPublicEntries,
  addEntry,
  getEntryById
};