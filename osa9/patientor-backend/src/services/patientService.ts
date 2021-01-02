import patients from '../../data/patients';
import { nonSensitivePatient, newPatient, Patient } from '../types';

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
    entries: [],
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

export default {
  getPatients,
  addPatient,
  getOne,
};
