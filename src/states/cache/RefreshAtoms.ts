import { useRecoilState } from "recoil";
import { workoutAtom } from "./WorkoutAtom";
import useWorkoutService from "../../services/WorkoutService";
import { workoutHistoryAtom } from "./WorkoutHistoryAtom";

export default function refreshAtoms() {
    const [_workoutData, setWorkoutData] = useRecoilState(workoutAtom);
    const [_workoutHistoryData, setWorkoutHistoryData] = useRecoilState(workoutHistoryAtom);
    const { getWorkouts, getWorkoutHistory } = useWorkoutService();

    const refreshWorkoutData = async () => {
        console.log("Refreshing workout data")
        setWorkoutData((oldData) => {
            return {
                ...oldData,
                isValid: false
            }
        })

        await getWorkouts();
    }

    const refreshWorkoutHistoryData = async () => {
        console.log("Refreshing workout history data")
        setWorkoutHistoryData((oldData) => {
            return {
                ...oldData,
                isValid: false
            }
        })

        await getWorkoutHistory();
    }

    return { refreshWorkoutData, refreshWorkoutHistoryData }
}