import { useEffect, useState } from 'react';
import { showError } from '../services/utils';
import { SetterOrUpdater } from 'recoil';

interface Query<T> {
  serviceCall: () => Promise<T>;
  cache?: {
    update: SetterOrUpdater<T>;
  };
  initialFetch?: boolean;
}

export default function useQuery<T>({
  serviceCall,
  cache,
  initialFetch = true,
}: Query<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [refreshes, setRefreshes] = useState(0);
  const [initialTry, setInitialTry] = useState(false);

  const refresh = () => setRefreshes((prev) => ++prev);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await serviceCall();

      setData(response);
      if (cache) {
        cache.update(response);
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch || initialTry) {
      fetchData();
    }

    setInitialTry(true);
  }, [refreshes]);

  return { loading, data, refresh };
}
