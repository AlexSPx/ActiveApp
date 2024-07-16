import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

export enum ExerciseWidgetType {
  ORM,
  VOLUME,
}

const ExerciseWidgetTypeDic = {
  0: 'ORM',
  1: 'Volume',
};

export type ExerciseWidgetProps = {
  id: string;
  name: string;
  type: ExerciseWidgetType;
  data: lineDataItem[];
};

export default function ExerciseWidget({
  widget,
}: {
  widget: ExerciseWidgetProps;
}) {
  const { colors } = useTheme();

  return (
    <View>
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
        adjustToWidth
        data={widget.data}
      />
    </View>
  );
}
