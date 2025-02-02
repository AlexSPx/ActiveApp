import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ExerciseCard, {
  Exercise,
} from '../../components/exercise_search/ExerciseCard';
import MainView from '../../components/MainView';
import { createExercisesAtom } from '../../states/CreateWorkoutState';
import {
  exerciseSearchQueryAtom,
  exerciseSearchQueryResultsAtom,
  removeFilter,
} from '../../states/ExerciseSearchState';
import { addExercise } from '../../utils/exerciseHelpers';
import { extractTags } from '../../utils/extractTags';
import { AuthStackProps } from '../../navigation/AuthNavigation';
import { SearchExerciseStackProps } from '../../navigation/ExerciseSearchNavigation';

export default function SearchExercise({
  navigation,
  route,
}: NativeStackScreenProps<SearchExerciseStackProps, 'search'>) {
  const { colors } = useTheme();
  const { onSelectExercise } = route.params;

  const [query, setQuery] = useRecoilState(exerciseSearchQueryAtom);
  const [exercises, setExercises] = useRecoilState(
    exerciseSearchQueryResultsAtom,
  );

  const [filters, setFilters] = useState(extractTags(query.tags));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilters(extractTags(query.tags));
  }, [query.tags]);

  // useEffect(() => {
  //   setPage(2);
  //   setExercises([]);
  // }, [query]);

  const fetchMoreResults = async () => {
    // const data = await makeRequest<any>(buildUrl(query.tags, query.name, page));
    // setPage((prev) => ++prev);
    // setExercises((prev) => [...prev, ...data.exercises]);
  };

  return (
    <MainView colors={colors}>
      {filters.length > 0 && (
        <FlatList
          ListHeaderComponent={() => (
            <Text
              variant="headlineSmall"
              style={{ marginHorizontal: 6, marginBottom: 2 }}
            >
              Filters:
            </Text>
          )}
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          numColumns={3}
          data={filters}
          keyExtractor={([_, item]) => item}
          renderItem={({ item: [tag, item] }) => {
            return (
              <Chip
                mode="flat"
                style={{ marginHorizontal: 6, marginVertical: 2 }}
                onPress={() =>
                  setQuery((prev) => ({
                    ...prev,
                    tags: removeFilter(prev.tags, tag),
                  }))
                }
              >
                {item}
              </Chip>
            );
          }}
        />
      )}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        onEndReached={fetchMoreResults}
        // ListFooterComponent={() =>
        //   isLoading ? <ActivityIndicator animating={true} /> : null
        // }
        renderItem={({ item }) => (
          <ExerciseCard
            colors={colors}
            exercise={item}
            func={(exercise: Exercise) => {
              onSelectExercise(exercise);
              navigation.goBack();
            }}
          />
        )}
      />
    </MainView>
  );
}
