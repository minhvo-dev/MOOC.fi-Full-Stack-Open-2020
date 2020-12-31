import { Diagnosis } from "../types";
import diagnoses from "../../data/diagnosis";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};
