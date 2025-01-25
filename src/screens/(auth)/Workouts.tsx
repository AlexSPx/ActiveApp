import React, { useMemo, useState } from "react";
import useWorkoutService from "../../services/WorkoutService";
import MainView from "../../components/MainView";
import { FAB, useTheme } from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { WorkoutCard } from "../../components/user_workouts/WorkoutCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { workoutAtom } from "../../states/cache/WorkoutAtom";

export default function Workouts({ navigation }: NativeStackScreenProps<any>) {
  const workoutsData = useRecoilValue(workoutAtom);  
  const { getWorkouts } = useWorkoutService();
  
  const { colors } = useTheme();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    try {
      getWorkouts();
    } finally {
      setRefreshing(false);
    }
  };

  const workouts = useMemo(() => workoutsData.data, [workoutsData.updatedAt]);

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
