import { atom, selector } from "recoil";
import { WorkoutHistory } from "../../services/WorkoutService";
import { ValidatedData } from "./validatedData";

export const workoutHistoryAtom = atom<ValidatedData<WorkoutHistory[]>>({
    key: 'workoutHistory',
    default: {
        data: [],
        updatedAt: new Date(),
        isValid: false
    }
})

// export const isWorkoutHistoryDataForRefresh = selector({
//     key: 'isWorkoutDataForRefresh',
//     get: ({ get }) => {
//         const workoutHistoryData = get(workoutHistoryAtom);

//         console.log("WorkoutHistory validity: " + workoutHistoryData.isValid);
        

//         return !workoutHistoryData.isValid || new Date().getTime() - workoutHistoryData.updatedAt.getTime() > 1000 * 60 * 60;
//     }
// }); 