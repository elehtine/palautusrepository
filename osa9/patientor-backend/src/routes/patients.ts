import express from 'express';

import patientsService from '../services/patientService';
import { toPatient, toEntry }from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message); // eslint-disable-line
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOne(id);

  if (patient === undefined) {
    res.status(404).send('not found');
  } else {
    res.send(patientsService.getOne(id));
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const entry = toEntry(req.body);
    const addedEntry = patientsService.addEntry(id, entry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message); // eslint-disable-line
  }
});

export default router;
