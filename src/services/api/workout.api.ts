import useAuthAxios from "../../utils/useAuthAxios";
import { Workout, WorkoutCreate, WorkoutHistory, WorkoutRecordRequest } from "../WorkoutService";
import { handleError } from "./utils";

export function WorkoutApi() {
  const axios = useAuthAxios();

  const getWorkouts = async (workoutPage: number): Promise<Workout[]> => {
    try {
        const workoutsResponse = await axios.get<Workout[]>(
            `/workout?page=${workoutPage}`
        )

        return workoutsResponse.data
    } catch(error) {
        throw handleError(error);
    }
  }

  const createWorkout = async(workout: {title: string, templateExerciseStructures: any[]}) =>  {
    try {
        await axios.post<string>('/workout', workout);
    } catch(error) {
        throw handleError(error);
    }
  }

  const createRecord = async (record :WorkoutRecordRequest) => {
    try {
      await axios.post<string>(
        '/workout/record',
        record,
      );

    } catch (error) {
      throw handleError(error);
    }
  };

  const getWorkoutHistory = async (): Promise<WorkoutHistory[]> => {
    try {    
        const records =
          await axios.get<WorkoutHistory[]>('/workout/record');      
  
        return records.data;
      } catch (error) {
        throw handleError(error);
      }
  }

  return { getWorkouts, createWorkout, createRecord, getWorkoutHistory }
}