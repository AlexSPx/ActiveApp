import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { isWorkoutRunningSelector } from "../states/RunnigWorkoutState";
import { useRecoilValue } from "recoil";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export default function TabsHeader({
  title,
  navigation,
}: {
  title: string;
  navigation: BottomTabNavigationProp<any>;
}) {
  const { colors } = useTheme();

  const isRunning = useRecoilValue(isWorkoutRunningSelector);

  return (
    <Appbar.Header mode="center-aligned" statusBarHeight={30}>
      <Appbar.Content title={title} />
      {isRunning && (
        <Appbar.Action
          icon={({ color, size }) => (
            <Icon name="play" size={size} color={color} />
          )}
          onPress={() => navigation.navigate("runningWorkout")}
        />
      )}
    </Appbar.Header>
  );
}
