import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { WorkoutHistory } from '../../services/WorkoutService';
import { lineDataItem } from 'react-native-gifted-charts';
import ExerciseWidget, {
  ExerciseWidgetType,
  ExerciseWidgetProps,
} from './ExerciseWidget';
import CreateWidgetMenu from './CreateWidgetMenu';
import { storage } from '../../stores/storage';

export default function Widgets({ history }: { history: WorkoutHistory[] }) {
  const [widgets, setWidgets] = useState<ExerciseWidgetProps[]>([]);
  const [refresh, setRefresh] = useState(0);

  const [createWidgetVisibility, setCreateWidgetVisibility] = useState(false);

  useEffect(() => {
    const keys = storage.getString('widgets') || '';

    const widgetsBuild: ExerciseWidgetProps[] = [];
    (JSON.parse(keys) as string[]).forEach((key) => {
      const widget = storage.getString(key);
      if (!widget) return;
      widgetsBuild.push(JSON.parse(widget));
    });

    setWidgets(widgetsBuild);
    setRefresh((old) => old++);
  }, []);

  useEffect(() => {
    const data = extractData(history, widgets);

    setWidgets((old) =>
      old.map((widget) => ({
        ...widget,
        data: data.get(getKey(widget)) || [],
      })),
    );
  }, [history, refresh]);

  return (
    <View>
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
      {widgets && (
        <FlatList
          data={widgets}
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

  widgets.forEach((widget) => data.set(getKey(widget), []));

  history.forEach((record) => {
    record.exercises.forEach((exercise) => {
      let orm = 0,
        volume = 0;
      const ormData = data.get(exercise.exerciseId + ExerciseWidgetType.ORM);
      const volumeData = data.get(
        exercise.exerciseId + ExerciseWidgetType.VOLUME,
      );

      console.log(exercise);

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

const getKey = (widget: ExerciseWidgetProps): string => {
  return widget.id + widget.type;
};
