import { ReactNode, useEffect } from "react";
import {
  getAuth,
  getCurrentExercises,
  getCurrentWorkout,
} from "../utils/secureStore";
import { useSetRecoilState } from "recoil";
import { currentExercisesAtom, currentWorkoutAtom } from "./RunnigWorkoutState";
import { authState } from "./authState";

export default function CacheRetriever({ children }: { children: ReactNode }) {
  const setCurrentWorkout = useSetRecoilState(currentWorkoutAtom);
  const setCurrentExercises = useSetRecoilState(currentExercisesAtom);
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    const userCache = async () => {
      const auth = await getAuth();

      if (auth) {
        setAuthState(auth);
      }
    };

    const workoutCache = async () => {
      const currEx = await getCurrentExercises();
      const currWo = await getCurrentWorkout();

      if (currEx && currWo) {
        setCurrentWorkout(currWo);
        setCurrentExercises(currEx);
      }
    };

    workoutCache();
    userCache();
  }, []);

  return <>{children}</>;
}
