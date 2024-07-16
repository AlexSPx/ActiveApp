import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { WorkoutHistory } from '../../services/WorkoutService';
import { lineDataItem } from 'react-native-gifted-charts';
import ExerciseWidget from './ExerciseWidget';
import CreateWidgetMenu from './CreateWidgetMenu';
import {
  ExerciseWidgetProps,
  ExerciseWidgetType,
  widgetsState,
} from '../../states/Widgets';
import { useRecoilState } from 'recoil';

export default function Widgets({ history }: { history: WorkoutHistory[] }) {
  const [createWidgetVisibility, setCreateWidgetVisibility] = useState(false);
  const [widgets, setWidgets] = useRecoilState(widgetsState);
  const [widgetsWithData, setWidgetsWithData] = useState<ExerciseWidgetProps[]>(
    [],
  );

  useEffect(() => {
    const data = extractData(history, widgets);
    setWidgetsWithData(
      widgets.map((widget) => ({
        ...widget,
        data: data.get(widget.key) || [],
      })),
    );
  }, [history, widgets]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CreateWidgetMenu
        visible={createWidgetVisibility}
        setVisible={(visibility: boolean) =>
          setCreateWidgetVisibility(visibility)
        }
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 8,
        }}
      >
        <Text variant="headlineSmall">Widgets</Text>
        <FAB
          icon="plus"
          mode="flat"
          size="small"
          onPress={() => setCreateWidgetVisibility(true)}
        />
      </View>
      {widgetsWithData && (
        <FlatList
          data={widgetsWithData}
          scrollEnabled
          renderItem={({ item }) => {
            return (
              <View>
                {item.data.length > 0 && <ExerciseWidget widget={item} />}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const extractData = (
  history: WorkoutHistory[],
  widgets: ExerciseWidgetProps[],
): Map<string, lineDataItem[]> => {
  const data: Map<string, lineDataItem[]> = new Map();

  widgets.forEach((widget) => data.set(widget.key, []));

  history.forEach((record) => {
    record.exercises.forEach((exercise) => {
      let orm = 0,
        volume = 0;
      const ormData = data.get(exercise.exerciseId + ExerciseWidgetType.ORM);
      const volumeData = data.get(
        exercise.exerciseId + ExerciseWidgetType.VOLUME,
      );

      if (ormData || volumeData) {
        for (let i = 0; i < exercise.reps.length; i++) {
          orm = Math.max(orm, exercise.weight[i]);
          volume += exercise.weight[i] * exercise.reps[i];
        }
      }

      const label = new Date(record.finishedAt).toDateString();

      if (ormData) ormData.push({ value: orm, label });
      if (volumeData) volumeData.push({ value: volume, label });
    });
  });

  return data;
};
