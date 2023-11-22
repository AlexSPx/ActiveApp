import React from "react";
import MainView from "../../components/MainView";
import { Button, useTheme } from "react-native-paper";
import { Settings } from "../../components/profile/Settings";
import useAuthService from "../../services/AuthService";

export default function Profile() {
  const { colors } = useTheme();
  const { logOut } = useAuthService();

  return (
    <MainView colors={colors} alignCenter>
      <Settings />

      <Button
        mode="contained"
        style={{
          backgroundColor: colors.errorContainer,
          borderRadius: 10,
          opacity: 0.8,
          marginTop: 15,
          width: "90%",
        }}
        textColor={colors.error}
        onPress={logOut}
      >
        Sign Out
      </Button>
    </MainView>
  );
}
