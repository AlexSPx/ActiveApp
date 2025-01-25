import { useRecoilState } from 'recoil';
import { authState } from '../states/authState';
import axios from 'axios';
import { API_ADDRESS } from './conf';
import { jwtDecode } from 'jwt-decode';

export default function useAuthAxios() {
  const [auth, setAuth] = useRecoilState(authState);
  
  const axiosInstance = axios.create({
    baseURL: API_ADDRESS,
    headers: { Authorization: "Bearer " + auth.token },
  });

  axiosInstance.interceptors.request.use(async (req) => {    
    try {
      const decoded = jwtDecode(auth.token!);
    
      if (decoded.exp! > Date.now() / 1000) return req;

      console.log("after: ", auth);

      const newToken = await axios.post(`${API_ADDRESS}/auth/token/refresh`, {
        refreshToken: auth.refresh,
      });

      setAuth((prev) => ({
        ...prev,
        token: newToken.data.token,
        refresh: newToken.data.refresh,
      }));

      req.headers.Authorization = "Bearer " + newToken.data.token;
      return req;
    } catch(error) {
      console.error(error);
      setAuth((prev) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        refresh: null,
      }));
      throw error;
    }
    
  });

  return axiosInstance;
}
