import React from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import MainView from "../../components/MainView";
import { FlatList, SafeAreaView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Exercise from "../../components/create_workout/Exercise";
import { useRecoilState } from "recoil";
import {
  createExercisesAtom,
  createWorkoutAtom,
} from "../../states/CreateWorkoutState";
import useExerciseService from "../../services/ExerciseService";
import useWorkoutService from "../../services/WorkoutService";
import { showError, showMessage } from "../../services/utils";
import useServiceCall from "../../utils/useServiceCall";

export default function CreateWorkout({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors } = useTheme();

  const { createRecords } = useExerciseService();
  const { createWorkout } = useWorkoutService();

  const [title, setTitle] = useRecoilState(createWorkoutAtom);
  const [exercises, setExercises] = useRecoilState(createExercisesAtom);

  const { executeService, loading } = useServiceCall();

  const cancelCreating = () => {
    setExercises([]);
    setTitle("Workout");
  };

  const handleCreateWorkout = async () => {
    executeService(async () => {
      const exerciseIds = await createRecords(exercises);

      await createWorkout({
        title,
        workoutStructureRecords: exerciseIds,
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
              <Button
                mode="contained-tonal"
                style={{
                  borderRadius: 10,
                  marginTop: 15,
                }}
                onPress={() => navigation.navigate("exerciseSearch")}
              >
                Add Exercise
              </Button>

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
