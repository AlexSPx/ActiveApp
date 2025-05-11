import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { calculateTotalWeight } from "../../utils/calculateTotalWeight";
import { ExerciseRecord } from "../../services/ExerciseService";

export function TotalWeight({ exerciseRecords, size = 15}: { exerciseRecords: ExerciseRecord[], size?: number }) {
    const totalWeight = useMemo(() => calculateTotalWeight(exerciseRecords), [exerciseRecords]);
  
    const textStyle = (() => {
        if (size >= 15) return "titleLarge";
        if (size >= 14) return "titleMedium";
        if (size >= 12) return "titleSmall";
        if (size >= 8) return "bodyLarge";
        return "bodySmall";
    })();

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="weight-hanging" size={size} style={{ marginRight: 8 }} />
        <Text variant={textStyle} style={{ marginTop: 1 }}>{totalWeight}kg</Text>
      </View>
    );
  }