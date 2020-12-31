interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExercises = (argv: Array<string>): { hours: Array<number>, target: number } => {
  if (argv.length < 4) throw new Error("Invalid arguments");

  const [, , target, ...hours] = argv.map((arg: string): number => Number(arg));

  if (isNaN(target) || hours.find((h: number): boolean => isNaN(h)) !== undefined) {
    throw new Error("Invalid arguments");
  }

  return {
    hours,
    target
  };
};

export const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length;

  const trainingDays: number = hours.filter(hour => hour > 0).length;

  const average: number = hours.reduce((prev: number, cur: number): number => prev + cur, 0) / periodLength;

  let rating = 1;
  if (average >= target * 0.75) rating += 1;
  if (average >= target) rating += 1;

  let ratingDescription = "";
  if (rating === 1) {
    ratingDescription = "need to improve";
  }
  else if (rating === 2) {
    ratingDescription = "almost there";
  }
  else {
    ratingDescription = "good job";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { hours, target } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(hours, target));
}
catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
  else {
    throw error;
  }
}
