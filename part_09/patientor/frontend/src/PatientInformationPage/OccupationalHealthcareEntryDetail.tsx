import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisCodeList from "./DiagnosisCodeList";
import { getISODateString } from "../utils/helper";

const OccupationalHealthcareEntryDetail: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header><Icon name="calendar check outline" /> <span className="date">{getISODateString(entry.date)}</span></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Header>Employer name</Card.Header>
        <Card.Description>{entry.employerName}</Card.Description>
      </Card.Content>
      {entry.sickLeave &&
        <Card.Content>
          <Card.Header>Sick leave</Card.Header>
          <Card.Description>
            <p><strong>Start date:</strong> {getISODateString(entry.sickLeave.startDate)}</p>
            <p><strong>End date:{"  "}</strong> {getISODateString(entry.sickLeave.endDate)}</p>
          </Card.Description>
        </Card.Content>
      }
      {entry.diagnosisCodes &&
        <Card.Content>
          <DiagnosisCodeList codeIDs={entry.diagnosisCodes} />
        </Card.Content>
      }
    </Card>
  );
};

export default OccupationalHealthcareEntryDetail;