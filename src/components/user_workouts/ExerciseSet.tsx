import { View } from "react-native";
import { Text } from "react-native-paper";
import { ExerciseRecord } from "../../services/ExerciseService";

export const ExerciseSet = ({ exercise }: { exercise: ExerciseRecord }) => (
  <View
    key={exercise.id}
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Text>{exercise.exerciseName}</Text>
    <Text>{exercise.reps.length} sets</Text>
  </View>
);
