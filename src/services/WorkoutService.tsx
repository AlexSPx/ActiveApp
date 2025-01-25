import { useState } from 'react';
import { handleError } from './api/utils';
import useAuthAxios from '../utils/useAuthAxios';
import useExerciseService, { ExerciseRecord } from './ExerciseService';
import { WorkoutExerciseCreate } from '../states/CreateWorkoutState';
import { Exercise } from '../components/exercise_search/ExerciseCard';
import { WorkoutExerciseCurrent } from '../states/RunnigWorkoutState';
import { WorkoutApi } from './api/workout.api';

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

export interface WorkoutRecordRequest {
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

  const workkoutApi = WorkoutApi();

  const getWorkouts = async (): Promise<Workout[]> => {
    return workkoutApi.getWorkouts(workoutsPage);
  };

  const createWorkout = async (workout: WorkoutCreate) => {
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

      return workkoutApi.createWorkout(requestPayload);
  };

  const createRecord = async (workoutRecord: CreateRecordRequest, exerciseRecordLocal: WorkoutExerciseCurrent[]) => {
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

      workkoutApi.createRecord(recordRequest);
  };

  const getWorkoutHistory = async () => {
    return workkoutApi.getWorkoutHistory();
  };

  return { getWorkouts, createWorkout, createRecord, getWorkoutHistory };
}
