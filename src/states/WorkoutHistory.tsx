import { atom } from "recoil";
import { WorkoutHistory } from "../services/WorkoutService";

export const workoutHistory = atom<WorkoutHistory[]>({
    key: 'workoutHistory',
    default: []
})