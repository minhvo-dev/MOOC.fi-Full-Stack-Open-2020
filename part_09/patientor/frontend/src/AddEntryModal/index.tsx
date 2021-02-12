import React from "react";
import { Divider, Dropdown, DropdownProps, Form, Modal, Segment } from "semantic-ui-react";
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm, { HospitalEntryFormValues } from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from "./AddOccupationalHealthcareEntryForm";

export type EntryFormValues = HealthCheckEntryFormValues | HospitalEntryFormValues | OccupationalHealthcareEntryFormValues;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryFormOptions: Array<{
    key: string;
    text: string;
    value: string;
  }>;
  entryValue: string | undefined;
  setEntryValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryFormOptions, entryValue, setEntryValue }: Props) => {
  const selectFormEntry = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const selected = entryFormOptions.find(option => option.value === data.value);
    if (selected) {
      setEntryValue(selected.value);
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header style={{ color: "white", backgroundColor: "blue"}}>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Form.Field>
          <label>Type</label>
          <Dropdown
            defaultValue={entryValue}
            fluid
            selection
            options={entryFormOptions}
            onChange={selectFormEntry}
          />
        </Form.Field>
        <Divider />
        {entryValue === entryFormOptions[0].value && <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />}
        {entryValue === entryFormOptions[1].value && <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />}
        {entryValue === entryFormOptions[2].value && <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;