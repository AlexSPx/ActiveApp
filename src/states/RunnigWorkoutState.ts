import { atom, selector, useSetRecoilState } from "recoil";
import { saveCurrentExercises, saveCurrentWorkout } from "../utils/secureStore";

interface WorkoutCurrent {
  title: string;
  workoutId: string;
}

interface ExerciseSet {
  reps: string;
  weight: string;
  finished: boolean;
}

type WorkoutExerciseCurrent = {
  exerciseId: string;
  title: string;
  sets: ExerciseSet[];
};

export { WorkoutExerciseCurrent, ExerciseSet, WorkoutCurrent };

export const currentWorkoutAtom = atom<WorkoutCurrent>({
  key: "currentWorkout",
  default: { title: "", workoutId: "" },
  effects: [
    ({ onSet }) => {
      onSet(async (newValue) => {
        await saveCurrentWorkout(newValue);
      });
    },
  ],
});

export const currentExercisesAtom = atom<WorkoutExerciseCurrent[]>({
  key: "currentExercises",

  default: [],
  effects: [
    ({ onSet }) => {
      onSet(async (newValue, oldValue) => {
        await saveCurrentExercises(newValue);
      });
    },
  ],
});

export const isWorkoutRunningSelector = selector({
  key: "isWorkoutRunningSelector",
  get: ({ get }) => {
    const exercises = get(currentExercisesAtom);

    return exercises.length > 0;
  },
});

export const checkFinishedSelector = selector({
  key: "checkFinishedSelector",
  get: ({ get }) => {
    const exercises = get(currentExercisesAtom);

    for (const exercise of exercises) {
      for (const set of exercise.sets) {
        if (!set.finished) return false;
      }
    }
    return true;
  },
});

export const useResetRunningWorkout = () => {
  const setDetails = useSetRecoilState(currentWorkoutAtom);
  const setExercises = useSetRecoilState(currentExercisesAtom);

  return function reset() {
    setDetails({ title: "", workoutId: "" });
    setExercises([]);
  };
};
