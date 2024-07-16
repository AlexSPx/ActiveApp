import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { Exercise } from '../exercise_search/ExerciseCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackProps } from '../../navigation/AuthNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

type InvokeSearchProps = {
  style?: ViewStyle;
  mode?:
    | 'text'
    | 'outlined'
    | 'text'
    | 'contained'
    | 'elevated'
    | 'contained-tonal';
  label: string;
  onSelect: (e: Exercise) => void;
  before?: () => void;
  after?: () => void;
};

export default function InvokeSearch({
  style,
  mode,
  label,
  onSelect,
  before,
  after,
}: InvokeSearchProps) {
  const navigation = useNavigation<StackNavigationProp<AuthStackProps>>();

  return (
    <Button
      mode={mode}
      style={style}
      onPress={() => {
        if (before) before();

        navigation.navigate('searchExercise', {
          onSelectExercise: (e: Exercise) => {
            onSelect(e);
            if (after) after();
          },
        });
      }}
    >
      {label}
    </Button>
  );
}
