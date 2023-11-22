import { useTheme, Text } from "react-native-paper";
import { useRecoilState } from "recoil";
import {
  FilterEnum,
  exerciseSearchQueryAtom,
} from "../../states/ExerciseSearchState";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { FilterSection } from "../../components/exercise_search/FilterSection";

const filterTags: Filter[] = [
  {
    name: FilterEnum.ExerciseType,
    values: [
      "Strength",
      "Plyometrics",
      "Cardio",
      "Stretching",
      "Powerlifting",
      "Strongman",
      "Olympic Weightlifting",
    ],
  },
  {
    name: FilterEnum.BodyPart,
    values: [
      "Abdominals",
      "Adductors",
      "Abductors",
      "Biceps",
      "Calves",
      "Chest",
      "Forearms",
      "Glutes",
      "Hamstrings",
      "Lats",
      "Lower Back",
      "Middle Back",
      "Traps",
      "Neck",
      "Quadriceps",
      "Shoulders",
      "Triceps",
    ],
  },
  {
    name: FilterEnum.Equipment,
    values: [
      "Bands",
      "Barbell",
      "Kettlebells",
      "Dumbbell",
      "Other",
      "Cable",
      "Machine",
      "Body Only",
      "Medicine Ball",
      "Exercise Ball",
      "Foam Roll",
      "EZ Curl Bar",
      "None",
    ],
  },
  {
    name: FilterEnum.Level,
    values: ["Intermediate", "Beginner", "Expert"],
  },
];

export interface Filter {
  name: FilterEnum;
  values: string[];
}

export default function SearchFilters() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useRecoilState(exerciseSearchQueryAtom);

  const setFilter = (filterTag: FilterEnum, value: string | null) => {
    setSearchQuery((prev) => ({
      ...prev,
      tags: {
        ...prev.tags,
        [filterTag]: value,
      },
    }));
  };

  const isSelected = (filterTag: FilterEnum, value: string): boolean => {
    return searchQuery.tags[filterTag] === value;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: "5%",
          backgroundColor: colors.background,
        }}
      >
        <FlatList
          scrollEnabled
          style={{ marginVertical: "10%" }}
          ListHeaderComponent={() => (
            <Text
              variant="displaySmall"
              style={{
                marginBottom: "10%",
              }}
            >
              Filters
            </Text>
          )}
          data={filterTags}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <FilterSection
              tag={item}
              isSelected={(value: string) => isSelected(item.name, value)}
              select={(value: string | null) => setFilter(item.name, value)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
