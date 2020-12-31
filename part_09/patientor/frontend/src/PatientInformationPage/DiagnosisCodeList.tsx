import React from "react";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";

const DiagnosisCodeList: React.FC<{ codes: Array<Diagnosis["code"]> }> = ({ codes }) => {
  const [{ diagnoses },] = useStateValue();

  if (codes.length === 0) {
    return null;
  }

  return (
    <List>
      {codes.map(code =>
        <List.Item key={code}>
          <List.Icon name="bug" />
          <List.Content>
            <List.Header>{code}</List.Header>
            <List.Description>{diagnoses[code].name}</List.Description>
          </List.Content>
        </List.Item>
      )}
    </List>
  );
};

export default DiagnosisCodeList;