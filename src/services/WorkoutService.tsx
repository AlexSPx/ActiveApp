import { useState } from 'react';
import useAuthService from './AuthService';
import { handleError } from '../api/utils';
import useAxios from '../utils/useAxios';
import useExerciseService, { ExerciseRecord } from './ExerciseService';
import { WorkoutExerciseCreate } from '../states/CreateWorkoutState';
import { Exercise } from '../components/exercise_search/ExerciseCard';
import { WorkoutExerciseCurrent } from '../states/RunnigWorkoutState';

export interface WorkoutTemplate {
  id: string,
  templateExercises: TemplateExercise[] 
}

export interface TemplateExercise {
  id: number;
  weights?: number[];
  repetitions?: number[];
  durations?: number[];
  exercise: Exercise
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
  workoutTemplate: WorkoutTemplate;
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
  exercises: WorkoutExerciseCreate[];
}

interface CreateRecordRequest {
  workoutId: string;
  duration: number;
}

export interface WorkoutHistory {
  exerciseRecords: ExerciseRecord[];
  id: string;
  workoutTitle: string;
  createdAt: Date;
  timeToComplete?: number;
}[];

interface WorkoutRecordRequest {
  workoutId: string;
  timeToComplete?: number;
  exerciseRecords: ExerciseRecordRequest[]
}

interface ExerciseRecordRequest {
  exerciseId: string;
  weights?: string[];
  repetitions?: string[];
  durations?: string[];
}

export default function useWorkoutService() {
  const [workoutsPage, setWorkoutsPage] = useState(0);

  const { getRecords } = useExerciseService();

  const axios = useAxios();

  const getWorkouts = async (): Promise<Workout[]> => {
    try {
      const response = await axios.get<Workout[]>(
        `/workout?page=${workoutsPage}`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof Object && 'message' in error) throw error;
      throw handleError(error);
    }
  };

  const createWorkout = async (workout: WorkoutCreate) => {
    try {
      const requestPayload: {title: string, templateExerciseStructures: any[]} = {
        title: workout.title,
        templateExerciseStructures: []
      }

      workout.exercises.forEach(exercise => {
        requestPayload.templateExerciseStructures.push({
          exerciseId: exercise.exerciseId,
          weights: exercise.sets.map(set => set.weight),
          repetitions: exercise.sets.map(set => set.reps) 
        })
      })

      console.log(requestPayload);
      

      const response = await axios.post<string>('/workout', requestPayload);

      console.log(response.statusText);
      
      console.log(response.data);
      

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  const createRecord = async (workoutRecord: CreateRecordRequest, exerciseRecordLocal: WorkoutExerciseCurrent[]) => {
    try {
      const recordRequest: WorkoutRecordRequest = {
        workoutId: workoutRecord.workoutId,
        exerciseRecords: exerciseRecordLocal.map(record => {
          const exerciseRecord: ExerciseRecordRequest = {
            exerciseId: record.exerciseId,
            repetitions: [],
            weights: []
          }
  
          record.sets.forEach(set => {
            exerciseRecord.repetitions!.push(set.reps);
            exerciseRecord.weights!.push(set.weight);
          })
  
          return exerciseRecord;
        })
      }      

      await axios.post<string>(
        '/workout/record',
        recordRequest,
      );

    } catch (error) {
      throw handleError(error);
    }
  };

  const getWorkoutHistory = async () => {
    try {
      console.log('here');
    
      const records =
        await axios.get<WorkoutHistory[]>('/workout/record');

      console.log(records.data);
      

      return records.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  return { getWorkouts, createWorkout, createRecord, getWorkoutHistory };
}
