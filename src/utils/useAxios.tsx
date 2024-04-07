import { useRecoilState } from "recoil";
import { authState } from "../states/authState";
import axios from "axios";
import { API_ADDRESS } from "./conf";
import { jwtDecode } from "jwt-decode";

export default function useAxios() {
  const [auth, setAuth] = useRecoilState(authState);

  const axiosInstance = axios.create({
    baseURL: API_ADDRESS,
    headers: { Authorization: auth.token, uid: auth.user?.id },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!auth || !auth.token || !auth.refresh) return req;

    if (jwtDecode(auth.token).exp! > Date.now() / 1000) return req;

    const newToken = await axios.post(`${API_ADDRESS}/auth/token/refresh`, {
      refreshToken: auth.refresh,
    });

    setAuth((prev) => ({
      ...prev,
      token: newToken.data.token,
    }));

    req.headers.Authorization = newToken.data.token;
    return req;
  });

  return axiosInstance;
}
