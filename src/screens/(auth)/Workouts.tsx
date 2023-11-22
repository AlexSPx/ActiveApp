import React, { useEffect, useState } from "react";
import useWorkoutService, {
  Workout,
  WorkoutRecordWE,
} from "../../services/WorkoutService";
import MainView from "../../components/MainView";
import { FAB, useTheme, Text, Button } from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { WorkoutCard } from "../../components/user_workouts/WorkoutCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useQuery from "../../utils/useQuery";

export default function Workouts({ navigation }: NativeStackScreenProps<any>) {
  const { getWorkouts } = useWorkoutService();

  const {
    data: workouts,
    loading,
    refresh,
  } = useQuery<WorkoutRecordWE[]>({
    serviceCall: () => getWorkouts(),
  });

  const { colors } = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  };

  return (
    <MainView colors={colors}>
      <FAB
        icon="plus"
        onPress={() => navigation.navigate("createWorkout")}
        size="medium"
        mode="elevated"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 100,
        }}
      />

      <FlatList
        data={workouts}
        keyExtractor={(workout) => workout.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPressFunc={() =>
              navigation.navigate("workoutPreview", { workout: item })
            }
          />
        )}
      />
    </MainView>
  );
}
