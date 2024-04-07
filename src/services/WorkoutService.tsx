import { useState } from 'react';
import useAuthService from './AuthService';
import { handleError } from '../api/utils';
import useAxios from '../utils/useAxios';
import useExerciseService, { ExerciseRecord } from './ExerciseService';

interface WorkoutResponse {
  id: string;
  title: string;
  workoutStructure: {
    exerciseRecordIds: string[];
  };
  createdBy: string;
  updatedAt: string;
}

interface WorkoutRecordResponse {
  id: string;
  workoutId: string;
  workoutTitle: string;
  uid: string;
  duration: number;
  finishedAt: Date;
  exerciseRecordIds: string[];
}

export interface Workout {
  id: string;
  title: string;
  createdBy: string;
  updatedAt: string;
}

export interface WorkoutRecordWE {
  id: string;
  title: string;
  createdBy: string;
  updatedAt: string;
  structure: ExerciseRecord[];
}
[];

export interface WorkoutCreate {
  title: string;
  workoutStructureRecords: string[];
}

interface CreateRecordRequest {
  workoutId: string;
  workoutTitle: string;
  duration: number;
  exerciseRecordIds: string[];
}

export interface WorkoutHistory {
  exercises: ExerciseRecord[];
  id: string;
  workoutId: string;
  workoutTitle: string;
  uid: string;
  duration: number;
  finishedAt: Date;
}
[];

export default function useWorkoutService() {
  const [workoutsPage, setWorkoutsPage] = useState(0);

  const { getRecords } = useExerciseService();

  const axios = useAxios();

  const getWorkouts = async (): Promise<WorkoutRecordWE[]> => {
    try {
      const response = await axios.get<WorkoutResponse[]>(
        `/workout?page=${workoutsPage}`,
      );

      const exerciseWithRecords = await Promise.all(
        response.data.map(async ({ workoutStructure, ...workout }) => {
          const exercises = await getRecords(
            workoutStructure.exerciseRecordIds,
          );

          return {
            structure: exercises,
            ...workout,
          };
        }),
      );

      return exerciseWithRecords;
    } catch (error) {
      if (error instanceof Object && 'message' in error) throw error;
      throw handleError(error);
    }
  };

  const createWorkout = async (workout: WorkoutCreate) => {
    try {
      const response = await axios.post<string>('/workout', workout);

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  const createRecord = async (recordToCreate: CreateRecordRequest) => {
    try {
      const response = await axios.post<string>(
        '/workout/record',
        recordToCreate,
      );

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  const getWorkoutHistory = async () => {
    try {
      const records =
        await axios.get<WorkoutRecordResponse[]>('/workout/record');

      const response = await Promise.all(
        records.data.map(async ({ exerciseRecordIds, ...record }) => {
          const exercises = await getRecords(exerciseRecordIds);

          return {
            ...record,
            exercises: exercises,
          };
        }),
      );

      return response;
    } catch (error) {
      throw handleError(error);
    }
  };

  return { getWorkouts, createWorkout, createRecord, getWorkoutHistory };
}
