import useAxios from "../utils/useAxios";
import { Exercise } from "../components/exercise_search/ExerciseCard";
import { exerciseSearchQueryAtom } from "../states/ExerciseSearchState";
import { useRecoilState } from "recoil";
import { WorkoutExerciseCreate } from "../states/CreateWorkoutState";
import { handleError } from "../api/utils";

export interface ExerciseRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  reps: number[];
  weight: number[];
  timeBased: boolean;
}

export default function useExerciseService() {
  const axios = useAxios();

  const [query, setQuery] = useRecoilState(exerciseSearchQueryAtom);

  const formatTag = (tag: string | null) => {
    if (!tag) return null;
    return tag.toUpperCase().replace(" ", "_");
  };

  const searchExercises = async (): Promise<Exercise[] | null> => {
    try {
      const response = await axios.get<Exercise[]>(`/exercise/search`, {
        params: {
          title: query.name,
          type: formatTag(query.tags.exercisetype),
          bodyPart: formatTag(query.tags.bodypart),
          level: formatTag(query.tags.level),
          page: 0,
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  };

  const createRecords = async (exercises: WorkoutExerciseCreate[]) => {
    try {
      const data = exercises.map((exercise) => {
        const data = {
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.title,
          reps: [] as string[],
          weight: [] as string[],
        };

        exercise.sets.forEach((set) => {
          data.reps.push(set.reps);
          data.weight.push(set.weight);
        });

        return data;
      });

      const response = await axios.post<string[]>(
        "/exercise/record/bulk",
        data
      );

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  const getRecords = async (ids: string[]): Promise<ExerciseRecord[]> => {
    try {
      const records = await axios.post<ExerciseRecord[]>(
        "/exercise/record/get-all",
        ids
      );
      

      return records.data;
    } catch (error) {
      throw handleError(error);
    }
  };

  return { searchExercises, createRecords, getRecords };
}
