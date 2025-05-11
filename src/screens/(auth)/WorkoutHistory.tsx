import React, { useEffect, useState } from 'react';
import MainView from '../../components/MainView';
import { FlatList, RefreshControl, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import {
  WorkoutHistory as WorkoutHistoryProps,
} from '../../services/WorkoutService';
import {
  HistoryCard,
} from '../../components/workout_history/HistoryCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import { workoutHistoryAtom } from '../../states/cache/WorkoutHistoryAtom';
import refreshAtoms from '../../states/cache/RefreshAtoms';

type SectionedRecord = {
  key: string;
  title?: string;
  type: 'header' | 'item';
  data?: WorkoutHistoryProps;
};

export default function WorkoutHistory({
  navigation,
}: NativeStackScreenProps<any>) {
  const { colors } = useTheme();

  const historyData = useRecoilValue(workoutHistoryAtom);
  const { refreshWorkoutHistoryData } = refreshAtoms();

  const [orderedRecords, setOrderedRecords] = useState<SectionedRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshWorkoutHistoryData();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!historyData.data) return;

    const sorted = [...historyData.data].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const grouped: SectionedRecord[] = [];
    let lastHeader = '';

    sorted.forEach((record) => {
      const date = new Date(record.createdAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const headerKey = `${year}-${month}-${day}`;

      if (headerKey !== lastHeader) {
        grouped.push({
          key: `header-${headerKey}`,
          title: `${month} ${day}, ${year}`,
          type: 'header',
        });
        lastHeader = headerKey;
      }

      grouped.push({
        key: record.id,
        type: 'item',
        data: record,
      });
    });

    setOrderedRecords(grouped);
    setRefreshing(false);
  }, [historyData.updatedAt]);

  return (
    <MainView colors={colors}>
      {orderedRecords.length > 0 ? (
        <FlatList
          data={orderedRecords}
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.key}
          renderItem={({ item }) =>
            item.type === 'header' ? (
              <Text
                variant="titleMedium"
                style={{ marginVertical: 8, marginHorizontal: 12 }}
              >
                {item.title}
              </Text>
            ) : item.data ? (
              <HistoryCard
                record={item.data}
                onPressFunc={() =>
                  navigation.navigate('workoutHistoryView', {
                    workout: item.data,
                  })
                }
              />
            ) : null
          }
        />
      ) : (
        <Text style={{ margin: 16 }}>No Records</Text>
      )}
    </MainView>
  );
}
