import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { ReactNode, useEffect } from "react";
import { GOOGLE_WEB_CLIENT } from "../utils/conf";

export function GoogleProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      webClientId: GOOGLE_WEB_CLIENT,
      offlineAccess: true,
    });
  }, []);

  return <>{children}</>;
}
