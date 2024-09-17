interface Result {
  periodLength: number;
  trainingDays: number;
  average: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArguments = (args: string[]) => {
  let i = 2;
  const exerciseHrs = [];
  while (i < args.length) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided array contains non-numerical elements.");
    }
    exerciseHrs.push(Number(args[i]));
    i++;
  }
  return exerciseHrs;
};

function calculateExercises(exerciseHrs: number[]): Result {
  const avgHrs =
    exerciseHrs.reduce((prev, curr) => prev + curr, 0) / exerciseHrs.length;
  const target = 2;
  let rating = 1;
  let ratingDescription = "Try harder next time!";
  if (avgHrs - target > 0.2) {
    rating = 3;
    ratingDescription = "Excellent job!";
  } else if (target - avgHrs < 0.1) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  }
  return {
    periodLength: exerciseHrs.length,
    trainingDays: exerciseHrs.filter((hrs) => hrs > 0).length,
    average: avgHrs,
    target,
    success: avgHrs >= target,
    rating,
    ratingDescription,
  };
}

try {
  const exerciseHrs = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHrs));
} catch (error: unknown) {
  let errorMsg = "Something bad happened.";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.error(errorMsg);
}
