import React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import useErrorDialog from "../modals/ErrorInformationDialog";
import {
  useResetRunningWorkout,
  currentWorkoutAtom,
  currentExercisesAtom,
  checkFinishedSelector,
} from "../../states/RunnigWorkoutState";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackProps } from "../../navigation/AuthNavigation";
import useServiceCall from "../../utils/useServiceCall";
import useExerciseService from "../../services/ExerciseService";
import useWorkoutService from "../../services/WorkoutService";

export default function Footer({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthStackProps>;
}) {
  const resetWorkout = useResetRunningWorkout();

  const [workout, _setWorkout] = useRecoilState(currentWorkoutAtom);
  const [exercises, _setExercises] = useRecoilState(currentExercisesAtom);

  const isFinished = useRecoilValue(checkFinishedSelector);

  const { colors } = useTheme();
  const [ErrorDialog, showDialog] = useErrorDialog();

  const { createRecords } = useExerciseService();
  const { createRecord } = useWorkoutService();
  const { executeService, loading } = useServiceCall();

  const handleResetWorkout = () => {
    resetWorkout();
    navigation.navigate("tabs");
  };

  const finishWorkout = async () => {
    if (!isFinished) {
      showDialog("You have unfinished workouts!");
      return;
    }

    executeService(async () => {
      await createRecord({
        workoutId: workout.workoutId,
        duration: 0,
      }, exercises);
    });

    // handleResetWorkout();
  };

  return (
    <View style={{ marginBottom: 40, marginTop: 10 }}>
      <ErrorDialog />

      <Button
        mode="contained-tonal"
        style={{ marginTop: 12 }}
        onPress={finishWorkout}
        disabled={loading}
        loading={loading}
      >
        Finish Workout
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: 12,
          backgroundColor: colors.errorContainer,
        }}
        textColor={colors.error}
        onPress={handleResetWorkout}
      >
        Cancel Workout
      </Button>
    </View>
  );
}
