import patients from '../../data/patients.json';
import { nonSensitivePatient } from '../types';

const getPatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatients,
};
