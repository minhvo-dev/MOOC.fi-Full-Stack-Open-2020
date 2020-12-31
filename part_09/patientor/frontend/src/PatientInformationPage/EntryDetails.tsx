import React from "react";
import { Entry } from "../types";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";
import HospitalEntryDetail from "./HospitalEntryDetail";
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail";
import { assertNever } from "../utils/helper";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;