import * as SecureStore from "expo-secure-store";
import { Settings } from "../states/SettingsContext";
import {
  WorkoutCurrent,
  WorkoutExerciseCurrent,
} from "../states/RunnigWorkoutState";
import { AuthState } from "../states/authState";
import { WorkoutHistory } from "../services/WorkoutService";

export async function saveSettings(value: Settings) {
  if (!value) return;

  await SecureStore.setItemAsync("settings", JSON.stringify(value));
}

export async function getSettings(): Promise<Settings | null> {
  let result = await SecureStore.getItemAsync("settings");
  return result ? JSON.parse(result) : result;
}

export async function saveCurrentWorkout(value: WorkoutCurrent) {
  if (!value) return;

  await SecureStore.setItemAsync("currentWorkout", JSON.stringify(value));
}

export async function saveCurrentExercises(value: WorkoutExerciseCurrent[]) {
  if (!value) return;

  await SecureStore.setItemAsync("currentExercises", JSON.stringify(value));
}

export async function getCurrentWorkout(): Promise<null | WorkoutCurrent> {
  const fetchStorage = await SecureStore.getItemAsync("currentWorkout");

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function getCurrentExercises(): Promise<
  null | WorkoutExerciseCurrent[]
> {
  const fetchStorage = await SecureStore.getItemAsync("currentExercises");

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function saveWorkoutHistory(value: WorkoutHistory[]) {
  if (!value) return;

  await SecureStore.setItemAsync("workoutHistory", JSON.stringify(value));
}

export async function getAuth(): Promise<null | AuthState> {
  const fetchStorage = await SecureStore.getItemAsync("auth");

  if (!fetchStorage) return null;

  return JSON.parse(fetchStorage);
}

export async function saveAuth(data: AuthState) {
  await SecureStore.setItemAsync("auth", JSON.stringify(data));
}
