export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

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
