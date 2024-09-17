const parseArgumentsBmi = (args: string[]) => {
  if (args.length < 4) {
    throw new Error("Too few arguments.");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { heightInCm: Number(args[2]), weightInKg: Number(args[3]) };
  } else {
    throw new Error("Please only include numerical values.");
  }
};

function calculateBmi(heightInCm: number, weightInKg: number): string {
  const heightInMeter = heightInCm / 100;
  const bmi = weightInKg / (heightInMeter ^ 2);
  if (bmi < 18.5) {
    return "Underweight.";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}
try {
  const { heightInCm, weightInKg } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (error: unknown) {
  let errorMsg = "Something went wrong.";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.error(errorMsg);
}
