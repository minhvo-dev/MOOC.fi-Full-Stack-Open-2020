import React from "react";
import { HospitalEntry } from "../types";
import { Field, Form, Formik } from "formik";
import { Button, Grid, Form as UIForm, Segment } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

/**
 * use type HospitalEntry but omit 'id' field
 * since it is unnecessary for a new HospitalEntry
 */
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onCancel: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
}

const AddHospitalEntryForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors["date"] = requiredError;
        }
        else if (!(Date.parse(values.date))) {
          errors["date"] = "Date is not formatted correctly";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        // no idea how to validate two fields of discharge using validate
        // Todo: use Yup to validate two fields of discharge
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
          <UIForm.Field>
            <label>Discharge</label>
          </UIForm.Field>
          <Segment>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
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

export default AddHospitalEntryForm;