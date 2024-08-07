import { View } from 'react-native';
import {
  Button,
  Modal,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';
import InvokeSearch from '../search_exercise/InvokeSearch';
import { useState } from 'react';
import { Exercise } from '../exercise_search/ExerciseCard';
import { showMessage } from '../../services/utils';
import { storage } from '../../stores/storage';
import { ExerciseWidgetType, widgetsState } from '../../states/Widgets';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function CreateWidgetMenu({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (to: boolean) => void;
}) {
  const { colors } = useTheme();

  const [widgets, setWidgets] = useRecoilState(widgetsState);

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [widgetType, setWidgetType] = useState<ExerciseWidgetType>(
    ExerciseWidgetType.ORM,
  );

  const createWidget = () => {
    if (!exercise) {
      showMessage('No exercise selected');
      return;
    }

    const key = exercise.id + widgetType;

    if (widgets.some((widget) => widget.key === key)) {
      showMessage('Widget already exists');
      return;
    }

    setWidgets((widgets) => [
      ...widgets,
      {
        key,
        id: exercise.id,
        name: exercise.title,
        data: [],
        type: widgetType,
      },
    ]);
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            width: '90%',
            height: '40%',
            borderRadius: 30,
            padding: 18,
          }}
        >
          <Text variant="headlineSmall">Create Widget</Text>
          <View
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <Text variant="titleLarge" style={{ marginLeft: 8 }}>
              Widget Type
            </Text>
            <RadioButton.Group
              onValueChange={(type) => setWidgetType(~~type)}
              value={widgetType.toString()}
            >
              <RadioButton.Item
                label="One Rep Max"
                value={ExerciseWidgetType.ORM.toString()}
              />
              <RadioButton.Item
                label="Volume"
                value={ExerciseWidgetType.VOLUME.toString()}
              />
            </RadioButton.Group>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <InvokeSearch
                label="Select Exercise"
                onSelect={setExercise}
                before={() => setVisible(false)}
                after={() => setVisible(true)}
              />
              {exercise && (
                <Text variant="bodySmall">exercise: {exercise?.title}</Text>
              )}
            </View>

            <Button
              mode="contained"
              onPress={createWidget}
              style={{ marginTop: 6 }}
            >
              Create
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
