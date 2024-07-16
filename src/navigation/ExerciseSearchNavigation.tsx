import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import SearchExercise from '../screens/(auth)/SearchExercise';
import { useTheme } from 'react-native-paper';
import HeaderSearchBar from '../components/exercise_search/HeaderSearchBar';
import SearchFilters from '../screens/(auth)/SearchFilters';
import { AuthStackProps } from './AuthNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Exercise } from '../components/exercise_search/ExerciseCard';

export type SearchExerciseStackProps = {
  search: { onSelectExercise: (e: Exercise) => void };
  filters: undefined;
};

const SearchStack = createStackNavigator<SearchExerciseStackProps>();

export default function ExerciseSearchNavigation({
  route,
}: NativeStackScreenProps<AuthStackProps, 'searchExercise'>) {
  const { colors } = useTheme();
  const { onSelectExercise } = route.params;

  return (
    <SearchStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerStyle: {
          backgroundColor: colors.background,
        },
        header: () => <HeaderSearchBar />,
      }}
    >
      <SearchStack.Screen
        name="search"
        component={SearchExercise}
        initialParams={{ onSelectExercise }}
      />
      <SearchStack.Screen
        name="filters"
        component={SearchFilters}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}
