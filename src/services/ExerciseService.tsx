import useAuthAxios from "../utils/useAuthAxios";
import { Exercise } from "../components/exercise_search/ExerciseCard";
import { exerciseSearchQueryAtom } from "../states/ExerciseSearchState";
import { useRecoilState } from "recoil";

export interface ExerciseRecord {
  id: string;
  exercise: Exercise;
  repetitions: number[];
  weights: number[];
}

export default function useExerciseService() {
  const axios = useAuthAxios();

  const [query, setQuery] = useRecoilState(exerciseSearchQueryAtom);

  // TO-DO: implement all search params
  const searchExercises = async (): Promise<Exercise[] | null> => {
    try {
      const response = await axios.get<Exercise[]>(`/exercise/search`, {
        params: {
          title: query.name,
        },
      });      

      return response.data;
    } catch (error) {
      console.log(error);
      
      return null;
    }
  };

  return { searchExercises };
}
