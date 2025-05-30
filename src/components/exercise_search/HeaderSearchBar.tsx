import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  exerciseSearchQueryAtom,
  exerciseSearchQueryResultsAtom,
} from "../../states/ExerciseSearchState";
import { View } from "react-native";
import SearchBar from "./SearchBar";
import useExerciseService from "../../services/ExerciseService";

export default function HeaderSearchBar() {
  const { colors } = useTheme();

  const [query, setQuery] = useRecoilState(exerciseSearchQueryAtom);
  const setExercises = useSetRecoilState(exerciseSearchQueryResultsAtom);
  const [loading, setLoading] = useState(false);

  const { searchExercises } = useExerciseService();

  const getSearchResults = async () => {
    setLoading(true);
    try{
      const data = await searchExercises();
      setExercises(data ? data : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <SearchBar
        loading={loading}
        title={query.name}
        colors={colors}
        setTitle={(t) =>
          setQuery((prev) => ({
            ...prev,
            name: t,
          }))
        }
        executeSearch={getSearchResults}
      />
    </View>
  );
}
