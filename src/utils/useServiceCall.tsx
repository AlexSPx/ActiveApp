import React, { useState } from "react";
import { showError } from "../services/utils";
import { isAxiosError } from "axios";
import useAuthService from "../services/AuthService";

export default function useServiceCall() {
  const [loading, setLoading] = useState(false);

  const { logOut } = useAuthService();

  async function executeService<T>(serviceCall: () => Promise<T>) {
    setLoading(true);
    try {
      const data = await serviceCall();

      return data;
    } catch (error) {
      showError(error);

      if (isAxiosError(error) && error.code === "401") {
        logOut();
      }
    } finally {
      setLoading(false);
    }
  }

  return { executeService, loading };
}
