import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, useTheme, Text } from "react-native-paper";
import { getBestSet } from "../../utils/getBestSet";
import { WorkoutHistory } from "../../services/WorkoutService";

export const HistoryCard = ({
  record,
  onPressFunc,
}: {
  record: WorkoutHistory;
  onPressFunc: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <Card
      key={record.finishedAt.toString()}
      mode="contained"
      style={{
        backgroundColor: colors.secondaryContainer,
        overflow: "hidden",
        marginVertical: 4,
      }}
    >
      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={onPressFunc}
      >
        <Card.Title title={record.workoutTitle} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Exercise</Text>
          <Text>Best Set</Text>
        </View>

        {record.exercises.map((exercise) => {
          const bestSet = getBestSet(exercise.weight, exercise.reps);
          return (
            <View
              key={exercise.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>
                {exercise.weight.length} x {exercise.exerciseName}
              </Text>
              <Text>
                {exercise.weight[bestSet]} x {exercise.reps[bestSet]}
              </Text>
            </View>
          );
        })}
      </TouchableOpacity>
    </Card>
  );
};
