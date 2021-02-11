import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { DateField, DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import { Field, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { healthCheckEntryFormSchema } from "../utils/schema";


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
      // eslint-disable-next-line
      validationSchema={healthCheckEntryFormSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
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