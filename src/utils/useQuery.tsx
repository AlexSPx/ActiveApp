import { useEffect, useState } from "react";
import { showError } from "../services/utils";

interface Query<T> {
  serviceCall: () => Promise<T>;
}

export default function useQuery<T>({ serviceCall }: Query<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [refreshes, setRefreshes] = useState(0);

  const refresh = () => setRefreshes((prev) => ++prev);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await serviceCall();

      setData(response);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshes]);

  return { loading, data, refresh };
}
