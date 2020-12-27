import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

calculateExercises([ 5 ], 2);

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmiResult = calculateBmi(Number(height), Number(weight));
    res.send(bmiResult);
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  const hours = req.body.daily_exercises;
  const target = req.body.target;


  if (hours === undefined || target === undefined) {
    res.send({ error: "parameters missing" });
  } else if (isNaN(Number(target)) || hours.some((h: string) => isNaN(Number(h))) ) {
    res.send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(hours, target);
    res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
