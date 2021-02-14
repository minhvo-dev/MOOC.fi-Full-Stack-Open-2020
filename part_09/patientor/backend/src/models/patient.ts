import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { PatientDocument } from "../types";

// ssn must be in this format: ######-####
const ssnValidator = (value: string): boolean => {
  const arr = value.split("-").map(str => str.replace(/[^0-9a-zA-Z]/g, ""));
  return arr.length === 2 && arr[0].length === 6 && arr[1].length === 4;
};

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
    validate: [ssnValidator, "SSN must be in ######-#### format"]
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  },
  occupation: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry"
    }
  ]
});

// apply uniqueValidator to the schema
patientSchema.plugin(uniqueValidator);

// modify the toJSON function
patientSchema.set("toJSON", {
  transform: (_document: any, returnedObject: PatientDocument) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model<PatientDocument>("Patient", patientSchema);