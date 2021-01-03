import patients from '../../data/patients';
import { nonSensitivePatient, newPatient, Patient, Entry, newEntry } from '../types';

const getPatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getOne = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient === undefined) {
    return undefined;
  }
  return {
    ...patient,
  };
};

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: `${patients.length}`,
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: newEntry ): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient === undefined) {
    throw new Error('patient doesn\'t exist');
  }

  const newEntry: Entry = {
    ...entry,
    id: `${patient.entries.length}`,
  };

  patient.entries.push(newEntry);
  return patient;
};


export default {
  getPatients,
  addPatient,
  getOne,
  addEntry,
};
