export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating?: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type newEntry = 
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export enum Gender {
  Other = 'other',
  Female = 'female',
  Male = 'male',
}

export type nonSensitivePatient = Omit<Patient, 'ssn' | 'entries' >;
export type newPatient = Omit<Patient, 'id' | 'entries' >;
