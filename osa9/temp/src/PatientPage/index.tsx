import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Icon, Card, Button } from "semantic-ui-react";

import { AddHospitalModal, AddHealthCheckModal, AddOccupationalHealthcareModal } from "../addEntryModal";
import { HospitalFormValues } from "../addEntryModal/AddHospitalForm";
import { OccupationalHealthcareFormValues } from "../addEntryModal/AddOccupationalHealthcareForm";
import { HealthcheckFormValues } from "../addEntryModal/AddHealthcheckForm";

import {
  Patient,
  Entry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  Diagnosis
} from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";

type color = "green" | "orange" | "yellow" | "grey";

const colors: color[] = [
  "green",
  "orange",
  "yellow",
  "grey",
]

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="hospital" size="big"/></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((d, i) => (
              <li key={i}>{d} {diagnoses[d].name}</li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="user md" size="big"/></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((d, i) => (
              <li key={i}>{d} {diagnoses[d].name}</li>
            ))}
          </ul>
          <Icon name="heart" size="big" color={colors[entry.healthCheckRating]} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}<Icon name="stethoscope" size="big"/><strong>{entry.employerName}</strong>
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((d, i) => (
              <li key={i}>{d} {diagnoses[d].name}</li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    default:
      return <div>loading...</div>;
  }
};

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<string>('');

  const openModal = (value: string): void => setModalOpen(value);
  const closeModal = (): void => {
    setModalOpen('');
  };

  const patient = patients[id];

  useEffect(() => {
    if (patient.ssn !== undefined) {
      return;
    }

    try {
      axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then((res) => {
          patients[res.data.id] = res.data;
          dispatch({ 
            type: "SET_PATIENT_LIST",
            payload: Object.values(patients)
          });
        });
    } catch (e) {
      console.error(e.response.data);
    }
  }, []); // eslint-disable-line

  if (patient.ssn === undefined) {
    return <div>Loading...</div>;
  }

  const submitNewEntry = async (values: OccupationalHealthcareFormValues | HospitalFormValues | HealthcheckFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const icon = patient.gender === 'male' ?
    <Icon name="mars" /> :
    <Icon name="venus" />;

  return (
    <div className="App">
      <Container textAlign="left">
        <h2>{patient.name} {icon}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occuptaion: {patient.occupation}</p>
        <AddHospitalModal
          modalOpen={modalOpen === 'hospital'}
          onSubmit={submitNewEntry}
          onClose={closeModal}
        />
        <AddOccupationalHealthcareModal
          modalOpen={modalOpen === 'occupationalhealthcare'}
          onSubmit={submitNewEntry}
          onClose={closeModal}
        />
        <AddHealthCheckModal
          modalOpen={modalOpen === 'healthcheck'}
          onSubmit={submitNewEntry}
          onClose={closeModal}
        />
        <Button onClick={() => openModal('hospital')}>Add New Hospital Entry</Button>
        <Button onClick={() => openModal('occupationalhealthcare')}>Add New Occupational Healthcare Entry</Button>
        <Button onClick={() => openModal('healthcheck')}>Add New Healthcheck Entry</Button>
        { patient.entries.length > 0 &&
          <div>
            <p>entries</p>
            {patient.entries.map((e, i) => (
              <EntryDetails entry={e} key={i} />
            ))}
          </div>
        }
      </Container>
    </div>
  );
};

export default PatientPage;
