import React from "react";
import { OccupationalHealthcareEntry } from '../types';
import { Field, Form, Formik } from "formik";
import { Button, Grid, Segment, Form as UIForm } from "semantic-ui-react";
import { DatePickerField, DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { occupationHealthcareEntrySchema } from "../utils/schema";

/**
 * use type OccupationalHealthcareEntry but omit 'id' field
 * since it is unnecessary for a new OccupationalHealthcareEntry
 */
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onCancel: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        employerName: "",
        specialist: ""
      }}
      onSubmit={onSubmit}
      // eslint-disable-next-line
      validationSchema={occupationHealthcareEntrySchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <Grid columns={2} divided style={{ marginBottom: 0 }}>
            <Grid.Row>
              <Grid.Column width={4}>
                <Field
                  label="Date"
                  name="date"
                  component={DatePickerField}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Field
            label="Employer Name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Entry description"
            name="description"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <UIForm.Field>
            <label>Sick Leave</label>
          </UIForm.Field>
          <Segment>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    label="Start Date"
                    name="sickLeave.startDate"
                    component={DatePickerField}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    label="End Date"
                    name="sickLeave.endDate"
                    component={DatePickerField}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
                </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
                </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddOccupationalHealthcareEntryForm;