import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import GenderIcon from "./GenderIcon";
import Entries from "./Entries";
import AddEntryModal, { EntryFormValues } from "../AddEntryModal";
import { getISODateString } from "../utils/helper";

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
      /* eslint-disable */
      console.error(error.response.data);
      setError(error.response.data);
      /* eslint-enable */
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
          /* eslint-disable */
          const fetchPatientInformation = async () => {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            setPatient(patientFromApi);
            dispatch(updatePatient(patientFromApi));
          };
          fetchPatientInformation();
          /* eslint-enable */
        }
      }
    }
  }, [patients, id, dispatch]);

  if (!patient) {
    return <h3>Fetching data...</h3>;
  }

  return (
    <div>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={8}>
            <Grid columns={2} divided>
              <Grid.Row>
                <Container textAlign="center">
                  <h2>Patient Information</h2>
                </Container>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6} textAlign="right"><em>Name</em></Grid.Column>
                <Grid.Column width={10}><strong>{patient.name}</strong></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6} textAlign="right"><em>Date of birth</em></Grid.Column>
                <Grid.Column width={10}>{getISODateString(patient.dateOfBirth)}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6} textAlign="right"><em>Gender</em></Grid.Column>
                <Grid.Column width={10}><GenderIcon patient={patient} /></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6} textAlign="right"><em>Occupation</em></Grid.Column>
                <Grid.Column width={10}>{patient.occupation}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6} textAlign="right"><em>Social Security Number</em></Grid.Column>
                <Grid.Column width={10}>{patient.ssn ? patient.ssn : "N/A"}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Container textAlign="center">
                  <Button
                    onClick={() => openModal()}
                    color="green"
                  >Add New Entry</Button>
                </Container>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image src="https://unsplash.it/800/800?random" size="medium" centered circular />
          </Grid.Column>
        </Grid.Row>
      </Grid>

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

    </div>
  );
};

export default PatientInformationPage;