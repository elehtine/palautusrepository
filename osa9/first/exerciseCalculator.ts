interface Arguments {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !args.slice(3).some( (x) => isNaN(Number(x)) )) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(s => Number(s))
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}


const calculateExercises = (hours: Array<number>, target: number): Result => {
  const mean = hours.reduce((a, b) => a + b) / hours.length;

  const diff = target - mean
  const rating = diff > 2 ? 1 : (diff > 0 ? 2 : 3);
  const descriptions = [ 'too bad', 'not too bad but could be better', 'excellent' ]
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(n => n !== 0).length,
    target,
    average: mean,
    success: mean >= target,
    rating,
    ratingDescription: descriptions[rating - 1],
  }

}

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
