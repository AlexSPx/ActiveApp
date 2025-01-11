import { useRecoilState } from 'recoil';
import { authState } from '../states/authState';
import axios from 'axios';
import { API_ADDRESS } from './conf';
import { jwtDecode } from 'jwt-decode';

export default function useAxios() {
  const [auth, setAuth] = useRecoilState(authState);

  const axiosInstance = axios.create({
    baseURL: API_ADDRESS,
    headers: { Authorization: "Bearer " + auth.token },
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

  // axiosInstance.interceptors.request.use(async (req) => {
  //   if (req.method === 'get') {
  //     const cachedDataCheck = storageValidation.getBoolean(req.url!);
  //     if (cachedDataCheck) {
  //       const cachedData = storage.getString(req.url!)!;
  //       req.data = JSON.parse(cachedData);
  //       req.cancelToken = new axios.CancelToken((cancel) => {
  //         cancel('Request fulfilled from cache');
  //       });
  //     }
  //   }

  //   return req;
  // });

  // axiosInstance.interceptors.response.use(async (res) => {
  //   if (res.config.method === 'get' && res.status >= 200 && res.status < 300) {
  //     storageValidation.set(res.config.url!, true);
  //     storage.set(res.config.url!, JSON.stringify(res.data));
  //   }
  //   return res;
  // });

  return axiosInstance;
}
