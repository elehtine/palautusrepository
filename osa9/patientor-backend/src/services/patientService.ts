import patients from '../../data/patients';
import { nonSensitivePatient, newPatient, Patient } from '../types';

const getPatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: `${patients.length}`,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
