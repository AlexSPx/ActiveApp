import { FilterEnum, Tags } from "../states/ExerciseSearchState";

export const extractTags = (tags: Tags): [FilterEnum, string][] => {
  const values: [FilterEnum, string][] = [];

  for (const key in tags) {
    const value = tags[key as keyof Tags];
    if (value !== null) {
      values.push([key as FilterEnum, value]);
    }
  }

  return values;
};
