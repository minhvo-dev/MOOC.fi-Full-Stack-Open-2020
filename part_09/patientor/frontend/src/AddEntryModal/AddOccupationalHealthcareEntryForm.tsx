import React from "react";
import { OccupationalHealthcareEntry } from '../types';
import { Field, Form, Formik } from "formik";
import { Button, Grid, Segment, Form as UIForm } from "semantic-ui-react";
import { DateField, DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
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
          <Field
            label="Employer Name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            // eslint-disable-next-line
            component={DateField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
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
            <Field
              label="Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              // eslint-disable-next-line
              component={DateField}
            />
            <Field
              label="End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              // eslint-disable-next-line
              component={DateField}
            />
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