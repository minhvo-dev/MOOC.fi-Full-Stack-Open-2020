/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Gender,
  NewPatient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Entry,
  NewHealthCheckEntry,
  HealthCheckRating,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewEntry
} from "./types";
import diagnosis from "../data/diagnosis";

const getPatientFromObject = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSSN(object.ssn),
    entries: []
  };
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Invalid name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid date");
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (param: any): Gender => {
  if (!param || !isGender(param)) {
    throw new Error("Invalid gender");
  }
  return param;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Invalid occupation");
  }
  return occupation;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Invalid SSN");
  }
  return ssn;
};

const isHealthCheckEntry = (object: any): object is HealthCheckEntry => {
  return ((object as HealthCheckEntry).type === "HealthCheck");
};

const isHospitalEntry = (object: any): object is HospitalEntry => {
  return ((object as HospitalEntry).type === "Hospital");
};

const isOccupationalHealthcareEntry = (object: any): object is OccupationalHealthcareEntry => {
  return ((object as OccupationalHealthcareEntry).type === "OccupationalHealthcare");
};

const isEntry = (object: any): object is Entry => {
  return isHealthCheckEntry(object) || isHospitalEntry(object) || isOccupationalHealthcareEntry(object);
};

const parseEntry = (object: any): Entry => {
  if (!isEntry(object)) {
    throw new Error("Invalid entry");
  }
  return object;
};

const getEntriesFromObject = (object: any): Entry[] => {
  if (!object.entries || !(object.entries instanceof Array)) {
    throw new Error("Invalid entries");
  }
  const array = object.entries as Array<any>;
  return array.map((entry) => parseEntry(entry));
};

const diagnosisCodes = new Set<string>(diagnosis.map(d => d.code));

const isDiagnosisCodeValid = (code: string): boolean => {
  return diagnosisCodes.has(code);
};

const isDiagnosisCodesValid = (codes: string[]): boolean => {
  return codes.map(code => isDiagnosisCodeValid(code)).reduce((carry, current) => carry && current, true);
};

const isNewBasicEntry = (obj: any): boolean => {
  return obj.date && isString(obj.date) && isDate(obj.date)
    && obj.description && isString(obj.description)
    && obj.specialist && isString(obj.specialist)
    && (!obj.diagnosisCodes || isDiagnosisCodesValid(obj.diagnosisCodes));
};

const isNewHealthCheckEntry = (object: any): object is NewHealthCheckEntry => {
  const obj = object as NewHealthCheckEntry;
  return (true
    && obj.type === "HealthCheck"
    && Object.values(HealthCheckRating).includes(obj.healthCheckRating));
};

const isNewHospitalEntry = (object: any): object is NewHospitalEntry => {
  const obj = object as NewHospitalEntry;
  return (true
    && obj.type === "Hospital"
    && isString(obj.discharge.date) && isDate(obj.discharge.date)
    && isString(obj.discharge.criteria));
};

const isNewOccupationalHealthcareEntry = (object: any): object is NewOccupationalHealthcareEntry => {
  const obj = object as NewOccupationalHealthcareEntry;
  return (true
    && obj.type === "OccupationalHealthcare"
    && isString(obj.employerName)
    // check if sickLeave is available
    // if sickLeave is available then 
    // startDate and endDate must be available
    && (!obj.sickLeave || (true
      && isString(obj.sickLeave.startDate) && isDate(obj.sickLeave.startDate)
      && isString(obj.sickLeave.startDate) && isDate(obj.sickLeave.startDate)
    )));
};

const isNewEntry = (object: any): object is NewEntry => {
  return isNewBasicEntry(object) && (isNewHealthCheckEntry(object) || isNewHospitalEntry(object) || isNewOccupationalHealthcareEntry(object));
};

const parseNewEntry = (object: any): NewEntry => {
  if (!isNewEntry(object)) {
    throw new Error("Invalid new entry");
  }
  return object;
};

const getNewEntryFromObject = (object: any): NewEntry => {
  return parseNewEntry(object);
};

export {
  getPatientFromObject,
  getEntriesFromObject,
  getNewEntryFromObject
};