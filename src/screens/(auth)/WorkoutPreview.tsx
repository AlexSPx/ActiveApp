import React from "react";
import { Button, useTheme, Text } from "react-native-paper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentExercisesAtom,
  currentWorkoutAtom,
  isWorkoutRunningSelector,
} from "../../states/RunnigWorkoutState";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useConfirmationDialog from "../../components/modals/ConfirmationDialog";
import MainView from "../../components/MainView";
import { ScrollView } from "react-native";
import { AuthStackProps } from "../../navigation/AuthNavigation";

type Props = NativeStackScreenProps<AuthStackProps, "workoutPreview">;

export default function WorkoutPreview({ route, navigation }: Props) {
  const { workout } = route.params;
  if (!workout) return null;

  const { colors } = useTheme();

  const setExercises = useSetRecoilState(currentExercisesAtom);
  const setWorkoutDetails = useSetRecoilState(currentWorkoutAtom);

  const isWorkoutRunning = useRecoilValue(isWorkoutRunningSelector);
  const setWorkout = () => {
    setWorkoutDetails(() => ({
      title: workout.title,
      workoutId: workout.id,
    }));

    setExercises(() => [
      ...workout.structure.map((exercise) => {
        return {
          exerciseId: exercise.id,
          title: exercise.exerciseName,
          sets: exercise.reps.map((reps, idx) => ({
            reps: reps.toString(),
            weight: exercise.weight[idx].toString(),
            finished: false,
          })),
        };
      }),
    ]);

    navigation.navigate("runningWorkout");
  };

  const [ConfirmationDialog, showDialog] = useConfirmationDialog(setWorkout);

  const handleStartWorkout = () => {
    if (isWorkoutRunning)
      showDialog(
        "There is a workout currently running, do you wish to continue?"
      );
    else setWorkout();
  };

  return (
    <MainView colors={colors}>
      <ConfirmationDialog />
      <Text variant="displaySmall" style={{ marginVertical: 12 }}>
        {workout.title}
      </Text>
      <ScrollView>
        {workout.structure.map((exercise) => (
          <Text
            key={exercise.id}
            variant="labelLarge"
            style={{ marginVertical: 4 }}
          >
            {exercise.weight.length} x {exercise.exerciseName}
          </Text>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        style={{ marginBottom: 22 }}
        onPress={handleStartWorkout}
      >
        Start workout
      </Button>
    </MainView>
  );
}
