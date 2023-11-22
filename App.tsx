import React, { useEffect, useMemo } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3DarkTheme as DefaultLightTheme,
  MD3LightTheme as DefaultDarkTheme,
  PaperProvider,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { theme as AppTheme } from "./src/themes/theme";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import { SettingsProvider, useSettings } from "./src/states/SettingsContext";
import CacheRetriever from "./src/states/CacheRetriever";
import Navigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { decode, encode } from "base-64";
import { GoogleProvider } from "./src/states/GoogleProvider";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const LightTheme = {
  ...DefaultLightTheme,
  colors: AppTheme.light.colors,
};

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: AppTheme.dark.colors,
};

const layout = () => {
  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    const dismountSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    dismountSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CacheRetriever>
            <GoogleProvider>
              <SafeAreaProvider>
                <SettingsProvider>
                  <ColorsSchemeProvider>
                    <Navigation />
                  </ColorsSchemeProvider>
                </SettingsProvider>
              </SafeAreaProvider>
            </GoogleProvider>
          </CacheRetriever>
        </RecoilRoot>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const ColorsSchemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const { settings } = useSettings();

  const paperTheme = useMemo(() => {
    switch (settings.theme) {
      case "default-light":
        return LightTheme;
      case "default-dark":
        return DarkTheme;
      case "default-system":
        return colorScheme === "dark" ? DarkTheme : LightTheme;
      case "colors-system":
        return colorScheme === "dark"
          ? { ...DarkTheme, colors: theme.dark }
          : { ...LightTheme, colors: theme.light };

      default:
        return LightTheme;
    }
  }, [colorScheme, theme, settings.theme]);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar backgroundColor={paperTheme.colors.background} />
      {children}
    </PaperProvider>
  );
};

export default layout;
