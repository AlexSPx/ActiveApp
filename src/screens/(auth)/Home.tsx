import { Avatar, useTheme } from 'react-native-paper';
import MainView from '../../components/MainView';

import { Text } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { authState } from '../../states/authState';
import { getCurrentWeek, weekDays } from '../../utils/getCurrentWeek';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { workoutHistory } from '../../states/WorkoutHistory';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { WorkoutHistory } from '../../services/WorkoutService';

export default function Home() {
  const { colors } = useTheme();

  const [{ user }, _] = useRecoilState(authState);
  const [history, _setHistory] = useRecoilState(workoutHistory);

  return (
    <MainView colors={colors}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 20,
          maxHeight: 100,
        }}
      >
        <Avatar.Text
          size={100}
          label={
            user!.firstname[0].toUpperCase() + user!.lastname[0].toUpperCase()
          }
        />
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: '100%',
            paddingHorizontal: 10,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              lineHeight: 25,
            }}
          >
            Welcome back, {'\n'}
            {user?.firstname} {user?.lastname}
          </Text>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: colors.secondary,
                paddingRight: 6,
              }}
            >
              @{user?.username}
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: colors.secondary,
              }}
            >
              workouts: {history.length}
            </Text>
          </View>
        </View>
      </View>

      <WeekActivities colors={colors} />
    </MainView>
  );
}

const WeekActivities = ({ colors }: { colors: MD3Colors }) => {
  const [goals, setGoals] = useState<Date[]>(getCurrentWeek());
  const scrollRef = useRef<FlatList<Date>>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [history, _setHistory] = useRecoilState(workoutHistory);

  useEffect(() => {
    const currentDay = new Date().getDay();
    const index = currentDay === 0 ? 6 : currentDay - 1;

    setCurrentDay(index);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToIndex({ index: currentDay, animated: true });
  }, [scrollRef, currentDay]);

  console.log(goals);

  return (
    <FlatList
      data={goals}
      style={{
        maxHeight: 120,
      }}
      horizontal={true}
      scrollEnabled={true}
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View
          style={{
            width: 80,
            height: 80,
            margin: 3,
            backgroundColor:
              index === currentDay
                ? colors.primaryContainer
                : colors.elevation.level5,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 6,
          }}
        >
          <View
            style={{
              flex: 1,
              height: '100%',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {binarySearchByFinishedAt(history, item) && (
              <Icon
                name="check"
                size={30}
                style={{
                  fontWeight: '100',
                }}
              />
            )}
          </View>
          <Text
            style={{
              color: index === currentDay ? colors.primary : colors.secondary,
            }}
          >
            {weekDays[index]}
          </Text>
        </View>
      )}
      getItemLayout={(_data, index) => ({
        length: 80,
        offset: 86 * index,
        index,
      })}
    />
  );
};

function binarySearchByFinishedAt(
  array: WorkoutHistory[],
  targetDate: Date,
): WorkoutHistory | null {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midDate = array[mid].finishedAt;

    const comparison = compareDates(midDate, targetDate);

    if (comparison === 0) {
      return array[mid];
    } else if (comparison < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return null;
}

function compareDates(d1: Date, d2: Date): number {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 !== year2) {
    return year1 - year2;
  }

  if (month1 !== month2) {
    return month1 - month2;
  }

  return day1 - day2;
}
