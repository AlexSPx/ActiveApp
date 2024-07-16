import * as SecureStore from 'expo-secure-store';
import { Settings } from '../states/SettingsContext';
import {
  WorkoutCurrent,
  WorkoutExerciseCurrent,
} from '../states/RunnigWorkoutState';
import { AuthState } from '../states/authState';
import { WorkoutHistory } from '../services/WorkoutService';
import { storage } from './storage';

export async function saveSettings(value: Settings) {
  if (!value) return;

  storage.set('settings', JSON.stringify(value));
}

export async function getSettings(): Promise<Settings | null> {
  let result = storage.getString('settings');
  return result ? JSON.parse(result) : result;
}

export async function saveCurrentWorkout(value: WorkoutCurrent) {
  if (!value) return;

  storage.set('currentWorkout', JSON.stringify(value));
}

export async function saveCurrentExercises(value: WorkoutExerciseCurrent[]) {
  if (!value) return;

  storage.set('currentExercises', JSON.stringify(value));
}

export async function getCurrentWorkout(): Promise<null | WorkoutCurrent> {
  const fetchStorage = storage.getString('currentWorkout');

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function getCurrentExercises(): Promise<
  null | WorkoutExerciseCurrent[]
> {
  const fetchStorage = storage.getString('currentExercises');

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function saveWorkoutHistory(value: WorkoutHistory[]) {
  if (!value) return;

  storage.set('workoutHistory', JSON.stringify(value));
}

export async function getAuth(): Promise<null | AuthState> {
  const fetchStorage = await SecureStore.getItemAsync('auth');

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function saveAuth(data: AuthState) {
  await SecureStore.setItemAsync('auth', JSON.stringify(data));
}
