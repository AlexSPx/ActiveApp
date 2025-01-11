import React from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import MainView from '../../components/MainView';
import { FlatList, SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Exercise from '../../components/create_workout/Exercise';
import { useRecoilState } from 'recoil';
import {
  createExercisesAtom,
  createWorkoutAtom,
} from '../../states/CreateWorkoutState';
import useExerciseService from '../../services/ExerciseService';
import useWorkoutService from '../../services/WorkoutService';
import { showError, showMessage } from '../../services/utils';
import useServiceCall from '../../utils/useServiceCall';
import { AuthStackProps } from '../../navigation/AuthNavigation';
import { addExercise } from '../../utils/exerciseHelpers';
import InvokeSearch from '../../components/search_exercise/InvokeSearch';

export default function CreateWorkout({
  navigation,
}: NativeStackScreenProps<AuthStackProps>) {
  const { colors } = useTheme();

  const { createRecords } = useExerciseService();
  const { createWorkout } = useWorkoutService();

  const [title, setTitle] = useRecoilState(createWorkoutAtom);
  const [exercises, setExercises] = useRecoilState(createExercisesAtom);

  const { executeService, loading } = useServiceCall();

  const cancelCreating = () => {
    setExercises([]);
    setTitle('Workout');
  };

  const handleCreateWorkout = async () => {
    executeService(async () => {
      await createWorkout({
        title,
        exercises,
      });
    });

    navigation.goBack();
    cancelCreating();
  };

  return (
    <MainView colors={colors}>
      <TextInput
        mode="flat"
        style={{
          fontSize: 20,
          backgroundColor: colors.background,
        }}
        placeholder="Enter template name"
        value={title}
        onChangeText={(e) => setTitle(e)}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.exerciseId.toString()}
          renderItem={({ item, index }) => (
            <Exercise exercise={item} exerciseIdx={index} />
          )}
          ListFooterComponent={() => (
            <View>
              <InvokeSearch
                mode="contained-tonal"
                label="Add Exercise"
                style={{
                  borderRadius: 10,
                  marginTop: 15,
                }}
                onSelect={(exercise) => {
                  setExercises((prev) =>
                    addExercise(prev, exercise.id, exercise.title),
                  );
                }}
              />

              <View style={{ marginTop: 12 }}>
                <Button
                  mode="contained"
                  style={{
                    borderRadius: 10,
                    opacity: 0.8,
                    marginTop: 15,
                  }}
                  onPress={handleCreateWorkout}
                  loading={loading}
                  disabled={loading}
                >
                  Create
                </Button>

                <Button
                  style={{
                    backgroundColor: colors.errorContainer,
                    borderRadius: 10,
                    opacity: 0.8,
                    marginTop: 15,
                  }}
                  textColor={colors.error}
                  onPress={() => {
                    navigation.goBack();
                    cancelCreating();
                  }}
                >
                  Cancel
                </Button>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </MainView>
  );
}
