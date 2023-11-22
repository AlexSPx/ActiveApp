export const getBestSet = (weights: number[], reps: number[]): number => {
  let bestSet: number = weights[0] * reps[0];
  let bestSetIndex: number = 0;
  for (let i = 1; i < weights.length; i++) {
    let calc = weights[i] * reps[i];
    if (calc > bestSet) {
      bestSet = calc;
      bestSetIndex = i;
    }
  }

  return bestSetIndex;
};
