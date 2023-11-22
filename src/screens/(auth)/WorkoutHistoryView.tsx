import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackProps } from "../../navigation/AuthNavigation";
import { useTheme, Text } from "react-native-paper";
import MainView from "../../components/MainView";
import { formatDateToDdMmYyyy } from "../../utils/formatDateToDdMmYyyy";
import { FlatList, View } from "react-native";
import React from "react";

type Props = NativeStackScreenProps<AuthStackProps, "workoutHistoryView">;

export default function WorkoutHistory({ navigation, route }: Props) {
  const { workout } = route.params;
  if (!workout) return null;

  const { colors } = useTheme();

  return (
    <MainView colors={colors} paddingHorizontal={30} marginTop={30}>
      <Text variant="displaySmall" style={{ marginTop: 0 }}>
        {workout.workoutTitle}
      </Text>
      <Text>Complited {formatDateToDdMmYyyy(workout.finishedAt)}</Text>

      <FlatList
        data={workout.exercises}
        keyExtractor={(item) => item.exerciseId}
        renderItem={({ item }) => (
          <View key={item.id} style={{ marginVertical: 6 }}>
            <Text variant="headlineSmall">{item.exerciseName}</Text>
            {item.weight.map((wg, index) => (
              <Text variant="labelLarge" key={index}>
                {wg}kgs x {item.reps[index]}
              </Text>
            ))}
          </View>
        )}
      />
    </MainView>
  );
}
