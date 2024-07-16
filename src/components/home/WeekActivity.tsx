import { WorkoutHistory } from '../../services/WorkoutService';
import { useState, useRef, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getCurrentWeek, weekDays } from '../../utils/getCurrentWeek';
import { Text } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

type WeekActivitiesProps = {
  colors: MD3Colors;
  history: WorkoutHistory[];
};

export const WeekActivities = ({ colors, history }: WeekActivitiesProps) => {
  const [goals, _setGoals] = useState<Date[]>(getCurrentWeek());
  const scrollRef = useRef<FlatList<Date>>(null);
  const [currentDay, setCurrentDay] = useState(0);

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
