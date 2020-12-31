import React from "react";
import { Icon } from "semantic-ui-react";
import { Gender, Patient } from "../types";

const GenderIcon: React.FC<{ patient: Patient }> = ({ patient }) => {
  switch (patient.gender) {
    case Gender.Male:
      return <Icon name="mars" />;
    case Gender.Female:
      return <Icon name="venus" />;
    default:
      return <Icon name="transgender" />;
  }
};

export default GenderIcon;