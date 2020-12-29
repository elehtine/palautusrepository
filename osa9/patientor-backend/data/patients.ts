import patientsData from './patients.json';
import { Patient } from '../src/types';
import toPatient from '../src/utils';

const patients: Patient[] = patientsData.map(p => {
  const obj = toPatient(p) as Patient;
  obj.id = p.id;
  return obj;
});

export default patients;
