interface Result {
  periodLength: number;
  trainingDays: number;
  average: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

function calculateExercises(exerciseHrs: number[], target: number): Result {
  const avgHrs =
    exerciseHrs.reduce((prev, curr) => prev + curr, 0) / exerciseHrs.length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
