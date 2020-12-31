import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import DiagnosisCodeList from "./DiagnosisCodeList";

const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header><Icon name="calendar check outline" /> <span className="date">{entry.date}</span></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Card.Content>
      {entry.diagnosisCodes &&
        <Card.Content>
          <DiagnosisCodeList codes={entry.diagnosisCodes} />
        </Card.Content>
      }
    </Card>
  );
};

export default HealthCheckEntryDetail;