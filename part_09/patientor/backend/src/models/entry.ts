import * as mongoose from "mongoose";

import { EntryDocument } from "../types";

const entrySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["HealthCheck", "Hospital", "OccupationalHealthcare"]
  },
  date: {
    type: Date,
    required: true
  },
  specialist: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    minLength: 5
  },
  diagnosisCodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diagnosis"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient"
  },
  // health check entry
  healthCheckRating: {
    type: Number,
    min: 0,
    max: 3
  },
  // hospital entry
  discharge: {
    date: {
      type: Date,
    },
    criteria: {
      type: String,
      minLength: 5
    }
  },
  // occupational health check
  employerName: {
    type: String,
    minLength: 2
  },
  sickLeave: {
    startDate: Date,
    endDate: Date
  },
});

entrySchema.set("toJSON", {
  transform: (_document: any, returnedObject: EntryDocument) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model<EntryDocument>("Entry", entrySchema);
