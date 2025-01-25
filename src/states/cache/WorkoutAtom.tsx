import { atom, selector } from "recoil";
import { ValidatedData } from "./validatedData";
import { Workout } from "../../services/WorkoutService";

export const workoutAtom = atom<ValidatedData<Workout[]>>({
    key: 'workoutData',
    default: {
        data: [],
        updatedAt: new Date(),
        isValid: false
    }
})
