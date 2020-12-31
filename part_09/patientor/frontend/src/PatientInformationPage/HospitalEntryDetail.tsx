import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisCodeList from "./DiagnosisCodeList";

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header><Icon name="hospital outline" /> <span className="date">{entry.date}</span></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Header>Discharge</Card.Header>
        <Card.Meta>{entry.discharge.date}</Card.Meta>
        <Card.Description>{entry.discharge.criteria}</Card.Description>
      </Card.Content>
      {entry.diagnosisCodes &&
        <Card.Content>
          <DiagnosisCodeList codes={entry.diagnosisCodes} />
        </Card.Content>
      }
    </Card>
  );
};

export default HospitalEntryDetail;