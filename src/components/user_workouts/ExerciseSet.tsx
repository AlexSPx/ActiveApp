import { View } from "react-native";
import { Text } from "react-native-paper";
import { TemplateExercise } from "../../services/WorkoutService";

export const ExerciseSet = ({ template }: { template: TemplateExercise }) => {

  const numberOfSets = template.durations && template.durations.length || 
    template.repetitions && template.repetitions.length || 0; 

  return (
    <View
      key={template.id}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{template.exercise.title}</Text>
      <Text>{numberOfSets} sets</Text>
    </View>
  )
};
