import { Animated, Easing, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, useTheme, Text } from "react-native-paper";
import { getBestSet } from "../../utils/getBestSet";
import { WorkoutHistory } from "../../services/WorkoutService";
// import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

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

export const HistoryCardLoading = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    animateSkeleton();
  }, [animatedValue]);

  const gradientColors = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ff0000", "#00ff00"], // Start color to end color
  });

  return (
    <View style={styles.container}>
      {/* Placeholder card content */}
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
  },
  placeholder: {
    backgroundColor: "#ccc",
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    color: "green",
  },
  paragraph: {
    fontSize: 15,
    color: "#555555",
  },
});
