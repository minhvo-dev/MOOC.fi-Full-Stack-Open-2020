import * as yup from "yup";

import { HealthCheckRating } from "../types";

const getMinDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 150);
  return date;
};

const getMaxDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 150);
  return date;
};

export const healthCheckEntryFormSchema = yup.object({
  date: yup
    .date()
    .typeError("Please select a date")
    .min(getMinDate(), "Invalid date")
    .max(getMaxDate(), "Invalid date")
    .defined("Date is required"),
  specialist: yup
    .string()
    .min(2, "Specialist name is too short")
    .max(50, "Specialist name is too long")
    .defined("Specialist is required"),
  description: yup
    .string()
    .min(5, "Description is too short")
    .defined("Description is required"),
  healthCheckRating: yup
    .mixed()
    .oneOf(Object.values(HealthCheckRating))
    .defined("Rating is required")
});

export const hospitalEntrySchema = yup.object({
  date: yup
    .date()
    .typeError("Please select a date")
    .min(getMinDate(), "Invalid date")
    .max(getMaxDate(), "Invalid date")
    .defined("Date is required"),
  specialist: yup
    .string()
    .min(2, "Specialist name is too short")
    .max(50, "Specialist name is too long")
    .defined("Specialist is required"),
  description: yup
    .string()
    .min(5, "Description is too short")
    .defined("Description is required"),
  discharge: yup
    .object({
      date: yup
        .date()
        .typeError("Please select a date")
        .min(getMinDate(), "Invalid date")
        .max(getMaxDate(), "Invalid date")
        .defined("Date is required"),
      criteria: yup
        .string()
        .min(5, "Length is too short")
        .defined("Criteria is required")
    })
});

export const occupationHealthcareEntrySchema = yup.object({
  employerName: yup
    .string()
    .min(2, "Employer name is too short")
    .defined("Employer name is required"),
  date: yup
    .date()
    .min(getMinDate(), "Invalid date")
    .max(getMaxDate(), "Invalid date")
    .defined("Date is required"),
  specialist: yup
    .string()
    .min(2, "Specialist name is too short")
    .max(50, "Specialist name is too long")
    .defined("Specialist is required"),
  description: yup
    .string()
    .min(5, "Description is too short")
    .defined("Description is required"),
  sickLeave: yup
    .object({
      startDate: yup
        .date()
        .typeError("Please select a date")
        .min(getMinDate(), "Invalid date")
        .max(getMaxDate(), "Invalid date"),
      endDate: yup
        .date()
        .typeError("Please select a date")
        .min(getMinDate(), "Invalid date")
        .max(getMaxDate(), "Invalid date")
    })
});

export const patientSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name is too short")
    .defined("Name is required"),
  ssn: yup
    .string()
    .trim()
    .test("ssn test", "SSN must in ######-#### format", (value: string | null | undefined) => {
      if (!value) return false;
      const arr = value.split("-").map(str => str.replace(/[^0-9a-zA-Z]/g, ""));
      return arr.length === 2 && arr[0].length === 6 && arr[1].length === 4;
    })
    .defined("Social Security Number is required"),
  dateOfBirth: yup
    .date()
    .typeError("Please select a date")
    .min(getMinDate(), "Invalid date")
    .max(getMaxDate(), "Invalid date")
    .defined("Date of birth is required"),
  occupation: yup
    .string()
    .min(2, "Occupation is too short")
    .max(50, "Occupation is too long")
    .defined("Occupation is required")
});