import { ReactNode, useEffect } from 'react';
import {
  getAuth,
  getCurrentExercises,
  getCurrentWorkout,
} from '../stores/secureStore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentExercisesAtom, currentWorkoutAtom } from './RunnigWorkoutState';
import { authState } from './authState';
import { workoutHistory } from './WorkoutHistory';
import useWorkoutService from '../services/WorkoutService';
import { storage } from '../stores/storage';
import { widgetsState } from './Widgets';

export default function CacheRetriever({
  children,
  hideSplash,
}: {
  children: ReactNode;
  hideSplash: () => void;
}) {
  const setCurrentWorkout = useSetRecoilState(currentWorkoutAtom);
  const setCurrentExercises = useSetRecoilState(currentExercisesAtom);
  const setWorkoutHistory = useSetRecoilState(workoutHistory);
  const setWidgets = useSetRecoilState(widgetsState);

  const [auth, setAuthState] = useRecoilState(authState);

  const { getWorkoutHistory } = useWorkoutService();

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

      if (!storage.contains('widgets')) {
        storage.set('widgets', '[]');
      }
      setWidgets(JSON.parse(storage.getString('widgets')!));

      if (currEx && currWo) {
        setCurrentWorkout(currWo);
        setCurrentExercises(currEx);
      }
    };

    workoutCache();
    userCache();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (!auth.isAuthenticated) return;

      const workoutHistory = await getWorkoutHistory();
      setWorkoutHistory(workoutHistory);
    };

    fetch();
  }, [auth]);

  useEffect(() => {
    setTimeout(() => hideSplash(), 200);
  }, [auth]);

  return <>{children}</>;
}
