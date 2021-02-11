import React from "react";
import { HospitalEntry } from "../types";
import { Field, Form, Formik } from "formik";
import { Button, Grid, Form as UIForm, Segment } from "semantic-ui-react";
import { DatePickerField, DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { hospitalEntrySchema } from "../utils/schema";

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
      // eslint-disable-next-line
      validationSchema={hospitalEntrySchema}
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
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Field
                    label="Date"
                    name="discharge.date"
                    component={DatePickerField}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    label="Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
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

export default AddHospitalEntryForm;