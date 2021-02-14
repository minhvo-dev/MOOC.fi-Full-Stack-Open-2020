import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Header, Container, Grid, Divider } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInformationPage from "./PatientInformationPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    /* eslint-disable */
    // fetch patient list
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    // fetch diagnosis list
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiagnosisList();
    /* eslint-enable */
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Grid columns={2} style={{ paddingTop: 20, backgroundColor: "blue" }}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header size="huge" style={{ color: "white" }}>Patientor</Header>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button as={Link} to="/" style={{ color: "blue", backgroundColor: "white" }}>
                Home
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider hidden />

        <Container>
          <Switch>
            <Route path="/patients/:id" render={() => <PatientInformationPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
