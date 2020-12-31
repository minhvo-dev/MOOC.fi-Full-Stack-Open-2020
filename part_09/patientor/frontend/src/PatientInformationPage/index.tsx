import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries";
import { Button, Container, Item } from "semantic-ui-react";
import AddEntryModal, { EntryFormValues } from "../AddEntryModal";

const PatientInformationPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  // Entry modal states and control methods
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const entryFormOptions = [
    {
      key: "HealthCheckEntry",
      text: "Health Check Entry",
      value: "Health Check Entry"
    },
    {
      key: "HospitalEntry",
      text: "Hospital Entry",
      value: "Hospital Entry"
    },
    {
      key: "OccupationalHealthcareEntry",
      text: "Occupational Healthcare Entry",
      value: "Occupational Healthcare Entry"
    }
  ];
  const [entryValue, setEntryValue] = React.useState<string | undefined>(undefined);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    }
    catch (error) {
      console.error(error.response.data);
      setError(error.response.data);
    }
  };

  React.useEffect(() => {
    if (patients) {
      const patientInState = patients[id];
      if (patientInState) {
        // check if the patient has already fetched from the database
        // if not, then fetch it
        if ("ssn" in patientInState) {
          setPatient(patientInState);
        }
        else {
          const fetchPatientInformation = async () => {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            setPatient(patientFromApi);
            dispatch(updatePatient(patientFromApi));
          };
          fetchPatientInformation();
        }
      }
    }
  }, [patients, id, dispatch]);

  if (!patient) {
    return <h3>Fetching data...</h3>;
  }

  return (
    <div>
      <Container textAlign="center">
        <h2>Patient Information</h2>
      </Container>

      <Item.Group>
        <Item>
          <Item.Image src="https://unsplash.it/705/705" />
          <Item.Content>
            <Item.Header>{patient.name}</Item.Header>
            <Item.Meta><p><strong>Gender: <GenderIcon patient={patient} /></strong></p></Item.Meta>
            <Item.Description>{patient.occupation}</Item.Description>
            <Item.Extra><p><strong>SSN:</strong> {patient.ssn}</p></Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <Container>
        {patient.entries && patient.entries.length > 0 &&
          <Entries entries={patient.entries} />}
      </Container>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
        entryFormOptions={entryFormOptions}
        entryValue={entryValue}
        setEntryValue={setEntryValue}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInformationPage;