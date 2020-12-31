import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { Field, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";

/**
 * use type HealthCheckEntry but omit 'id' field
 * since it is unnecessary for a new HealthCheckEntry
 */
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const AddHealthCheckEntryForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        else if(!(Date.parse(values.date))) {
          errors.date = "Date is not formatted correctly";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        else if(!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
          errors.healthCheckRating = "Invalid rating";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
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
          <Field
            label="Health Check Rating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
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

export default AddHealthCheckEntryForm;