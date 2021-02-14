import * as mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { DiagnosisDocument } from "../types";

const diagnosisSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  latin: {
    type: String
  }
});

diagnosisSchema.plugin(uniqueValidator);

diagnosisSchema.set("toJSON", {
  transform: (_document: any, returnedObject: DiagnosisDocument) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
  virtuals: true
});

export default mongoose.model<DiagnosisDocument>("Diagnosis", diagnosisSchema);
