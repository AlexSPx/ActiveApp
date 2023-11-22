import { createStackNavigator } from "@react-navigation/stack";
import CreateWorkout from "../screens/(auth)/CreateWorkout";
import WorkoutPreview from "../screens/(auth)/WorkoutPreview";
import ExerciseSearchNavigation from "./ExerciseSearchNavigation";
import { WorkoutHistory, WorkoutRecordWE } from "../services/WorkoutService";
import AuthNavigation from "./TabsNavigation";
import RunningWorkout from "../screens/(auth)/RunningWorkout";
import WorkoutHistoryView from "../screens/(auth)/WorkoutHistoryView";

export type AuthStackProps = {
  tabs: undefined;
  exerciseSearch: undefined;
  createWorkout: undefined;
  searchExercise: undefined;
  workoutPreview: { workout: WorkoutRecordWE | undefined };
  runningWorkout: undefined;
  workoutHistoryView: { workout: WorkoutHistory | undefined };
};

const AuthStack = createStackNavigator<AuthStackProps>();

export default function AuthNavigationStack() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="tabs" component={AuthNavigation} />

      <AuthStack.Screen
        name="exerciseSearch"
        component={ExerciseSearchNavigation}
      />

      <AuthStack.Screen name="createWorkout" component={CreateWorkout} />

      <AuthStack.Screen
        name="searchExercise"
        component={ExerciseSearchNavigation}
      />
      <AuthStack.Screen name="workoutPreview" component={WorkoutPreview} />
      <AuthStack.Screen name="runningWorkout" component={RunningWorkout} />
      <AuthStack.Screen
        name="workoutHistoryView"
        component={WorkoutHistoryView}
      />
    </AuthStack.Navigator>
  );
}
