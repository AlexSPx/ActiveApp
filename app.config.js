const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Active - Dev" : "Active",
  slug: "active",
  version: "1.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? "com.alexspx.active.dev" : "com.alexspx.active",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICECS_DEV || "./google-services.json",
    package: IS_DEV ? "com.alexspx.active.dev" : "com.alexspx.active",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "3d83392e-b2a5-4dff-8ec0-819c356e70b9",
    },
  },
  plugins: ["@react-native-google-signin/google-signin"],
  owner: "alexspx",
};
