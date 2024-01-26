import React, { useEffect, useState } from "react";
import MainView from "../../components/MainView";
import { FlatList, RefreshControl, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import useWorkoutService, {
  WorkoutHistory as WorkoutHistoryProps,
} from "../../services/WorkoutService";
import {
  HistoryCard,
  HistoryCardLoading,
} from "../../components/workout_history/HistoryCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useQuery from "../../utils/useQuery";

export default function WorkoutHistory({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors } = useTheme();

  const { getWorkoutHistory } = useWorkoutService();

  const { data, loading, refresh } = useQuery<WorkoutHistoryProps[]>({
    serviceCall: () => getWorkoutHistory(),
  });

  const [orderedRecords, setOrderedRecords] =
    useState<Map<string, WorkoutHistoryProps[]>>();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refresh();
  };

  useEffect(() => {
    const monthMap = new Map<string, WorkoutHistoryProps[]>();

    const formatOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };

    data?.forEach((record) => {
      const date = new Date(record.finishedAt);
      const month = Intl.DateTimeFormat("en-US", formatOptions).format(date);

      if (!monthMap.has(month)) {
        monthMap.set(month, []);
      }

      const monthWorkouts = monthMap.get(month);
      if (monthWorkouts) {
        monthWorkouts.push(record);
      }
    });

    setOrderedRecords(monthMap);

    setRefreshing(false);
  }, [data]);

  return (
    <MainView colors={colors}>
      <HistoryCardLoading />
      {orderedRecords ? (
        <FlatList
          data={Array.from(orderedRecords.keys()).reverse()}
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text
                variant="titleMedium"
                style={{ marginVertical: 3, marginHorizontal: 12 }}
              >
                {item}
              </Text>

              <FlatList
                data={orderedRecords.get(item)}
                keyExtractor={(item, index) =>
                  item.finishedAt.toString() + index
                }
                renderItem={({ item }) => (
                  <HistoryCard
                    record={item}
                    onPressFunc={() =>
                      navigation.navigate("workoutHistoryView", {
                        workout: item,
                      })
                    }
                  />
                )}
              />
            </View>
          )}
        />
      ) : (
        <Text>No Records</Text>
      )}
    </MainView>
  );
}
