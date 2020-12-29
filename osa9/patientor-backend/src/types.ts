export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Other = 'other',
  Female = 'female',
  Male = 'male',
}

export type nonSensitivePatient = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;
