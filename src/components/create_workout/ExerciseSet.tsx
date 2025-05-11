import { memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { createExercisesAtom } from "../../states/CreateWorkoutState";
import { DataTable, TextInput, useTheme } from "react-native-paper";
import LeftSwipeableComponent from "../LeftSwipeableComponent";
import {
  removeSet,
  setSetRepsCreate,
  setSetWeightCreate,
} from "../../utils/exerciseHelpers";
import { ExerciseSet as ExerciseSetCreate } from "../../states/CreateWorkoutState";

function ExerciseSet({
  set,
  exerciseIdx,
  setIdx,
}: {
  set: ExerciseSetCreate;
  exerciseIdx: number;
  setIdx: number;
}) {
  const setExercises = useSetRecoilState(createExercisesAtom);
  const { colors } = useTheme();

  return (
    <LeftSwipeableComponent
      onSwipe={() =>
        setExercises((prev) => removeSet(prev, exerciseIdx, setIdx))
      }
    >
      <DataTable.Row
        key={setIdx}
        style={{ backgroundColor: colors.background }}
      >
        <DataTable.Cell>{setIdx + 1}</DataTable.Cell>
        <WorkoutTabelCell
          value={set.weight.toString()}
          onChange={(t: string) =>
            setExercises((prev) =>
              setSetWeightCreate(prev, exerciseIdx, setIdx, t)
            )
          }
        />
        <WorkoutTabelCell
          value={set.reps.toString()}
          onChange={(t: string) =>
            setExercises((prev) =>
              setSetRepsCreate(prev, exerciseIdx, setIdx, t)
            )
          }
        />
      </DataTable.Row>
    </LeftSwipeableComponent>
  );
}

const WorkoutTabelCell = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (t: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    onChange(inputValue);
  }
  return (
    <DataTable.Cell style={{ justifyContent: "center", height: "100%", paddingVertical: "2%" }}>
      <TextInput
        underlineColor="transperent"
        keyboardType="numeric"
        style={{
          flex: 1,
          maxWidth: 110,
          height: 30,
          paddingHorizontal: 2,
          textAlign: "center",
          borderRadius: 5,
        }}
        outlineStyle={{
          borderRadius: 30,
        }}
        value={inputValue}
        onChangeText={setInputValue}
        onBlur={handleBlur}
        onSubmitEditing={handleBlur}
      />
    </DataTable.Cell>
  );
};

export default memo(ExerciseSet);
