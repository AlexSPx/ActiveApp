import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import PublicNavigation from "./PublicNavigation";
import { useRecoilValue } from "recoil";
import { isAuthenticatedSelector } from "../states/authState";
import AuthNavigationStack from "./AuthNavigation";

export default function index() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthNavigationStack /> : <PublicNavigation />}
    </NavigationContainer>
  );
}
