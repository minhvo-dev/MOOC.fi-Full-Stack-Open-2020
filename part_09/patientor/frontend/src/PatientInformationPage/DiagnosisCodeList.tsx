import React from "react";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";

const DiagnosisCodeList: React.FC<{ codeIDs: Array<Diagnosis["id"]> }> = ({ codeIDs }) => {
  const [{ diagnoses },] = useStateValue();

  if (codeIDs.length === 0) {
    return null;
  }

  return (
    <List>
      {codeIDs.map(id =>
        <List.Item key={id}>
          <List.Icon name="bug" />
          <List.Content>
            <List.Header>{diagnoses[id].code}</List.Header>
            <List.Description>{diagnoses[id].name}</List.Description>
          </List.Content>
        </List.Item>
      )}
    </List>
  );
};

export default DiagnosisCodeList;