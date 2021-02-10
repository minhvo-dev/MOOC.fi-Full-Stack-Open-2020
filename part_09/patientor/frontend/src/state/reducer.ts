import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  } | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  } | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const newPatients = { ...state.patients };
      newPatients[action.payload.id] = action.payload;
      return {
        ...state,
        patients: newPatients
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};