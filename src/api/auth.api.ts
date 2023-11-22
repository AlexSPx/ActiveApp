import { axiosInstance, handleError } from "./utils";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type TokenPair = {
  token: string;
  refresh: string;
};

export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isConfirmed: boolean;
  created_date: Date;
  gid?: string;
};

export type AccessToken = {
  token: string;
};

export const AuthApi = {
  loginUser: async (loginUserRequest: LoginUserRequest): Promise<TokenPair> => {
    try {
      const response = await axiosInstance.post<TokenPair>(
        "/auth/user/login",
        loginUserRequest
      );

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  loginGoogle: async (idToken: string): Promise<TokenPair> => {
    try {
      const response = await axiosInstance.post<TokenPair>(
        "/auth/user/google/login",
        { idToken: idToken }
      );

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  getUser: async (token: string): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>("/auth/user/me", {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  refreshToken: async (refresh: string) => {
    try {
      const response = await axiosInstance.post<AccessToken>(
        "/auth/token/refresh",
        {
          refreshToken: refresh,
        }
      );

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
};
