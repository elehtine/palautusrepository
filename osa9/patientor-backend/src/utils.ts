/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


import {
  newPatient,
  Gender,
  newEntry,
  BaseEntry,
  Diagnose,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
} from './types';

const toPatient = (object: any): newPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


// ENTRY


const toEntry = (object: any): newEntry => {
  if (!object.type) {
    throw new Error('doesn\'t have type');
  }

  switch (object.type) {
    case 'Hospital':
      return parseHospital(object);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthcare(object);
    case 'HealthCheck':
      return parseHealthCheck(object);
    default:
      throw new Error('invalid type');
  };
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseCodes = (codes: any): Array<Diagnose['code']> => {
  if (!codes || !Array.isArray(codes) || codes.find(c => !isString(c))) {
    return [];
  }
  return codes;
};

const parseBase = (object: any): Omit<BaseEntry, 'id'> => {
  return {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseCodes(object.diagnosisCodes),
  };
};

interface Discharge {
  date: string
  criteria: string
};


const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseEmpolyerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
}


const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  if (isNaN(Number(param))) {
    throw new Error('Incorrect or missing healthCheckRating: ' + param);
  }
  return Object.values(HealthCheckRating).includes(Number(param));
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseOccupationalHealthcare = (object: any): Omit<OccupationalHealthcareEntry, 'id'> => {
  return {
    ...parseBase(object),
    type: 'OccupationalHealthcare',
    employerName: parseEmpolyerName(object.employerName),
  };
};

const parseHealthCheck = (object: any): Omit<HealthCheckEntry, 'id'> => {
  return {
    ...parseBase(object),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};

const parseHospital = (object: any): Omit<HospitalEntry, 'id'> => {
  return {
    ...parseBase(object),
    type: 'Hospital',
    discharge: parseDischarge(object.discharge),
  };
};


export {
  toPatient,
  toEntry,
};
