import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthcheckForm, { HealthcheckFormValues } from './AddHealthcheckForm';
import AddHospitalForm, { HospitalFormValues } from './AddHospitalForm';
import AddOccupationalHealthcareForm, { OccupationalHealthcareFormValues } from './AddOccupationalHealthcareForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthcheckFormValues | HospitalFormValues | OccupationalHealthcareFormValues ) => void;
  error?: string;
}

export const AddOccupationalHealthcareModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHospitalModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthcheck entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthcheckForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
