import { atom, selector } from "recoil";
import { User } from "../api/auth.api";
import { saveAuth } from "../utils/secureStore";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refresh: string | null;
}

export const authState = atom<AuthState>({
  key: "auth",
  default: {
    isAuthenticated: false,
    user: null,
    token: null,
    refresh: null,
  },
  effects: [
    ({ onSet }) => {
      onSet(async (newValue) => {
        await saveAuth(newValue);
      });
    },
  ],
});

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => {
    return get(authState).isAuthenticated;
  },
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    return get(authState).user;
  },
});

export const tokensSelector = selector({
  key: "tokensSelector",
  get: ({ get }) => {
    const authData = get(authState);
    return {
      token: authData.token,
      refresh: authData.refresh,
    };
  },
});
