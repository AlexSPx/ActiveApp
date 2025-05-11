import { ExerciseRecord } from "../services/ExerciseService";

export function calculateTotalWeight(exerciseRecords: ExerciseRecord[]) {
  return exerciseRecords.reduce((total, record) => {
    const weights = record.weights.map((weight, index) => weight * record.repetitions[index]);
    return total + weights.reduce((sum, weight) => sum + weight, 0);
  }, 0);
}