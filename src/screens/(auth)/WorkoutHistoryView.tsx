import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackProps } from "../../navigation/AuthNavigation";
import { useTheme, Text } from "react-native-paper";
import MainView from "../../components/MainView";
import { formatDateToDdMmYyyy } from "../../utils/formatDateToDdMmYyyy";
import { FlatList, View, StyleSheet } from "react-native";
import { ExerciseRecord } from "../../services/ExerciseService";
import { useMemo } from "react";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import Icon from "react-native-vector-icons/FontAwesome5";

type Props = NativeStackScreenProps<AuthStackProps, "workoutHistoryView">;

export default function WorkoutHistory({ route }: Props) {
  const { workout } = route.params;
  const { colors } = useTheme();

  if (!workout) return null;

  return (
    <MainView colors={colors} paddingHorizontal={30} marginTop={30}>
      <View style={styles.title}>
        <Text variant="displayMedium">
          {workout.workoutTitle}
        </Text>
        <Text>
          Completed {formatDateToDdMmYyyy(workout.createdAt)}
        </Text>
      </View>

      <FlatList
        data={workout.exerciseRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseRecordView exerciseRecord={item} colors={colors} />
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<TotalWeight exerciseRecords={workout.exerciseRecords} />}
      />
    </MainView>
  );
}

function ExerciseRecordView({
  exerciseRecord,
  colors,
}: {
  exerciseRecord: ExerciseRecord;
  colors: MD3Colors;
}) {
  return (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Text variant="headlineLarge">{exerciseRecord.exercise.title}</Text>
        <Text variant="titleMedium">1RM</Text>
      </View>
      <FlatList
        data={exerciseRecord.weights}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SetRecordView
            index={index}
            weight={item}
            repetitions={exerciseRecord.repetitions[index]}
            colors={colors}
          />
        )}
      />
    </View>
  );
}

function SetRecordView({
  index,
  weight,
  repetitions,
  colors,
}: {
  index: number;
  weight: number;
  repetitions: number;
  colors: MD3Colors;
}) {
  const oneRepMax = useMemo(
    () => Math.round(weight * (1 + repetitions / 30)),
    [weight, repetitions]
  );

  return (
    <View style={styles.setContainer}>
      <Text variant="titleMedium" style={[styles.setText, { color: colors.onSurfaceVariant }]}>
        {`${index + 1}. ${weight}kg x ${repetitions}`}
      </Text>
      <Text variant="bodyMedium" style={[styles.setText, { color: colors.onSurfaceVariant }]}>
        {`${oneRepMax}kg`}
      </Text>
    </View>
  );
}

function TotalWeight({ exerciseRecords }: { exerciseRecords: ExerciseRecord[] }) {
  const totalWeight = useMemo(() => {
    return exerciseRecords.reduce(
      (total, { weights, repetitions }) =>
        total +
        weights.reduce(
          (sum, weight, index) => sum + weight * repetitions[index],
          0
        ),
      0
    );
  }, [exerciseRecords]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon name="weight-hanging" size={15} style={{ marginRight: 8 }} />
      <Text variant="titleLarge" style={{ marginTop: 1 }}>{totalWeight}kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 16,
  },
  exerciseContainer: {
    marginVertical: 6,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setText: {
    fontSize: 16,
  },
});
