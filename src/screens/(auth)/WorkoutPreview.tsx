import React from 'react';
import { Button, useTheme, Text } from 'react-native-paper';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentExercisesAtom,
  currentWorkoutAtom,
  isWorkoutRunningSelector,
} from '../../states/RunnigWorkoutState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useConfirmationDialog from '../../components/modals/ConfirmationDialog';
import MainView from '../../components/MainView';
import { ScrollView } from 'react-native';
import { AuthStackProps } from '../../navigation/AuthNavigation';

type Props = NativeStackScreenProps<AuthStackProps, 'workoutPreview'>;

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
      ...workout.workoutTemplate.templateExercises.map((exerciseTemplate) => {
        return {
          exerciseId: exerciseTemplate.exercise.id,
          title: exerciseTemplate.exercise.title,
          sets: exerciseTemplate.repetitions!.map((reps, idx) => ({
            reps: reps.toString(),
            weight: exerciseTemplate.weights![idx].toString(),
            finished: false,
          })),
        };
      }),
    ]);

    navigation.navigate('runningWorkout');
  };

  const [ConfirmationDialog, showDialog] = useConfirmationDialog(setWorkout);

  const handleStartWorkout = () => {
    if (isWorkoutRunning)
      showDialog(
        'There is a workout currently running, do you wish to continue?',
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
        {workout.workoutTemplate.templateExercises.map((exerciseTemplate) => (
          <Text
            key={exerciseTemplate.id}
            variant="labelLarge"
            style={{ marginVertical: 4 }}
          >
            {exerciseTemplate.weights?.length} x {exerciseTemplate.exercise.title}
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
