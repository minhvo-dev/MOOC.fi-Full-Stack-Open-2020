interface bmiInput {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (argv: Array<string>): bmiInput => {
  if (argv.length !== 4) throw new Error("Invalid arguments");

  const height = Number(argv[2]);
  const weight = Number(argv[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Invalid arguments");
  }

  return {
    height,
    weight
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 15) return "Very severely underweight";
  if (bmi < 16) return "Severely underweight";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Over weight";
  if (bmi < 35) return "Obese Class I (Moderately obese)";
  if (bmi < 40) return "Obese Class II (Severely obese)";
  return "Obese Class III (Very severely obese)";
};

// console.log(calculateBmi(180, 74));

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
}
catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
  else {
    throw error;
  }
}
