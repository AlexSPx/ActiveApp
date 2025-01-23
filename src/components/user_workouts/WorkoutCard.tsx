import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Menu, Text, useTheme } from "react-native-paper";
import { Workout } from "../../services/WorkoutService";
import { ExerciseSet } from "./ExerciseSet";

type WorkoutCardProps = {
  workout: Workout;
  onPressFunc: () => void;
};

export const WorkoutCard = ({ workout, onPressFunc }: WorkoutCardProps) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({ x: 0, y: 0 });

  const { colors } = useTheme();

  const openMenu = (x: number, y: number) => {
    setMenuCoordinates({ x, y });
    setMenuOpened(true);
  };
  const closeMenu = () => setMenuOpened(false);

  return (
    <Card
      key={workout.id}
      mode="contained"
      style={{
        backgroundColor: colors.secondaryContainer,
        marginVertical: 10,
      }}
    >
      <Menu visible={menuOpened} onDismiss={closeMenu} anchor={menuCoordinates}>
        <Menu.Item title="Delete" onPress={() => {}} />
      </Menu>

      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={onPressFunc}
        onLongPress={({ nativeEvent }) =>
          openMenu(nativeEvent.pageX, nativeEvent.pageY)
        }
      >
        <Card.Title title={workout.title} />
        <Card.Content style={{}}>
          <FlatList
            data={workout.workoutTemplate.templateExercises}
            keyExtractor={(exercise) => exercise.id.toString()}
            renderItem={({ item }) => <ExerciseSet template={item} />}
          />
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};
