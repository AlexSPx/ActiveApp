import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Menu, Text, useTheme } from 'react-native-paper';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { storage } from '../../stores/storage';
import { ExerciseWidgetProps, widgetsState } from '../../states/Widgets';
import { useSetRecoilState } from 'recoil';

const ExerciseWidgetTypeDic = {
  0: 'ORM',
  1: 'Volume',
};

export default function ExerciseWidget({
  widget,
}: {
  widget: ExerciseWidgetProps;
}) {
  const { colors } = useTheme();

  const setWidgets = useSetRecoilState(widgetsState);

  const [menuOpened, setMenuOpened] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({ x: 0, y: 0 });

  const deleteWidget = () => {
    const key = widget.id + widget.type;

    setWidgets((widgets) => widgets.filter((widget) => widget.key !== key));
  };

  const openMenu = (x: number, y: number) => {
    setMenuCoordinates({ x, y });
    setMenuOpened(true);
  };

  return (
    <View>
      <TouchableOpacity
        onLongPress={({ nativeEvent }) =>
          openMenu(nativeEvent.pageX, nativeEvent.pageY)
        }
      >
        <Menu
          visible={menuOpened}
          onDismiss={() => setMenuOpened(false)}
          anchor={menuCoordinates}
        >
          <Menu.Item onPress={deleteWidget} title="Delete" />
        </Menu>

        <Text variant="titleLarge">
          {widget.name}, {ExerciseWidgetTypeDic[widget.type]}
        </Text>
        <LineChart
          color={colors.secondary}
          dataPointsColor={colors.onSurface}
          xAxisColor={colors.onSurface}
          yAxisColor={colors.onSurface}
          yAxisTextStyle={{
            color: colors.onSurface,
          }}
          xAxisLabelTextStyle={{
            color: colors.onSurface,
          }}
          width={350}
          adjustToWidth
          data={widget.data}
        />
      </TouchableOpacity>
    </View>
  );
}
