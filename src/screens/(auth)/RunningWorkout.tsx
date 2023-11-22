import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackProps } from "../../navigation/AuthNavigation";
import { useTheme } from "react-native-paper";
import { useRecoilState } from "recoil";
import { currentExercisesAtom } from "../../states/RunnigWorkoutState";
import Footer from "../../components/running_workout/Footer";
import MainView from "../../components/MainView";
import { FlatList } from "react-native";
import Exercise from "../../components/running_workout/Exercise";
import { useNavigation } from "@react-navigation/native";

export default function RunningWorkout() {
  const { colors } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackProps>>();

  const [exercises, _setExercises] = useRecoilState(currentExercisesAtom);

  return (
    <MainView colors={colors} marginTop={20}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseId.toString()}
        renderItem={({ item, index }) => (
          <Exercise exercise={item} exerciseIndex={index} />
        )}
        ListFooterComponent={() => <Footer navigation={navigation} />}
      />
    </MainView>
  );
}
