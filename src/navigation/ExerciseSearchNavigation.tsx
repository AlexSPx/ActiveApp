import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import SearchExercise from "../screens/(auth)/SearchExercise";
import { useTheme } from "react-native-paper";
import HeaderSearchBar from "../components/exercise_search/HeaderSearchBar";
import SearchFilters from "../screens/(auth)/SearchFilters";

const SearchStack = createStackNavigator();

export default function ExerciseSearchNavigation() {
  const { colors } = useTheme();

  return (
    <SearchStack.Navigator
      screenOptions={{
        presentation: "modal",
        headerStyle: {
          backgroundColor: colors.background,
        },
        header: () => <HeaderSearchBar />,
      }}
    >
      <SearchStack.Screen name="search" component={SearchExercise} />
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
