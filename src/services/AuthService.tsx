import { useRecoilState } from "recoil";
import { authState } from "../states/authState";
import { AuthApi, LoginUserRequest, TokenPair } from "./api/auth.api";
import { showError } from "./utils";
import { handleError } from "./api/utils";
import useAuthAxios from "../utils/useAuthAxios";

interface RegisterUserRequest {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  cpassword: string;
}

export default function useAuthService() {
  const [auth, setAuth] = useRecoilState(authState);
  const axios = useAuthAxios();

  const register = async (registerData: RegisterUserRequest) => {
    try {
      if (
        !registerData.username ||
        !registerData.firstname ||
        !registerData.lastname ||
        !registerData.password ||
        !registerData.cpassword ||
        !registerData.email
      ) {
        throw handleError({
          message: "Missing parameters",
        });
      }

      if (registerData.password !== registerData.cpassword) {
        throw handleError({
          message: "Passwords do not match",
        });
      }

      const tokens = await axios.post<TokenPair>("/auth/user", registerData);

      const user = await AuthApi.getUser(tokens.data.token);

      setAuth({
        isAuthenticated: true,
        user,
        token: tokens.data.token,
        refresh: tokens.data.refresh,
      });
    } catch (error) {
      throw handleError(error);
    }
  };

  const registerGoogle = async (idToken: string) => {
    try {
      const tokens = await axios.post<TokenPair>("/auth/user/google", {
        idToken,
      });

      const user = await AuthApi.getUser(tokens.data.token);

      setAuth({
        isAuthenticated: true,
        user,
        token: tokens.data.token,
        refresh: tokens.data.refresh,
      });
    } catch (error) {
      throw handleError(error);
    }
  };

  const login = async (loginData: LoginUserRequest) => {
    try {
      const tokens = await AuthApi.loginUser(loginData);

      const user = await AuthApi.getUser(tokens.token);

      setAuth({
        isAuthenticated: true,
        user,
        token: tokens.token,
        refresh: tokens.refresh,
      });
    } catch (error) {
      throw error;
    }
  };

  const loginGoogle = async (idToken: string) => {
    try {
      const tokens = await AuthApi.loginGoogle(idToken);

      const user = await AuthApi.getUser(tokens.token);

      setAuth({
        isAuthenticated: true,
        user,
        token: tokens.token,
        refresh: tokens.refresh,
      });
    } catch (error) {
      showError(error);
    }
  };

  const refreshToken = async () => {
    try {
      if (!auth.refresh) return;

      const response = await AuthApi.refreshToken(auth.refresh);

      setAuth((currVal) => ({
        ...currVal,
        token: response.token,
      }));
    } catch (error) {
      showError(error);
    }
  };

  const logOut = async () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      refresh: null,
      user: null,
    });
  };

  return { register, registerGoogle, login, loginGoogle, refreshToken, logOut };
}
