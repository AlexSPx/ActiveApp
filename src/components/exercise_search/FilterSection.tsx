import { FlatList, View } from "react-native";
import { FilterEnum } from "../../states/ExerciseSearchState";
import { Chip, Text } from "react-native-paper";
import { Filter } from "../../screens/(auth)/SearchFilters";

export const FilterSection = ({
  tag,
  isSelected,
  select,
}: {
  tag: Filter;
  isSelected: (value: string) => boolean;
  select: (value: string | null) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
        {tag.name}
      </Text>
      <FlatList
        contentContainerStyle={{
          flexDirection: "column",
        }}
        numColumns={3}
        data={tag.values}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const checkSelected = isSelected(item);

          return (
            <Chip
              key={item}
              onPress={() => (checkSelected ? select(null) : select(item))}
              style={{ margin: 2 }}
              selected={checkSelected}
              showSelectedOverlay
            >
              {item}
            </Chip>
          );
        }}
      />
    </View>
  );
};
