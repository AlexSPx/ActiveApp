import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import PublicNavigation from './PublicNavigation';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '../states/authState';
import AuthNavigationStack from './AuthNavigation';

export default function index() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  useEffect(() => {

    SplashScreen.hide();
  }, []);

  return (
    <>{isAuthenticated ? <AuthNavigationStack /> : <PublicNavigation />}</>
  );
}
