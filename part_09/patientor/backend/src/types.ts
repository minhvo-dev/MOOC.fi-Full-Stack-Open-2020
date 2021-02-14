import { Document } from "mongoose";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// ------------------------------
// Mongo document types
// ------------------------------
export interface DiagnosisDocument extends Document {
  id: string,
  code: string,
  name: string,
  latin?: string
}

export interface EntryDocument extends Document {
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  user: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating?: HealthCheckRating;
  discharge?: {
    date: string;
    criteria: string;
  };
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface PatientDocument extends Document {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Array<EntryDocument>;
}