import React, { useState } from "react";
import MainView from "../../components/MainView";
import { Button, useTheme } from "react-native-paper";
import LoginHeadline from "../../components/auth/LoginHeadline";
import { AuthInputComponent } from "../../components/auth/AuthInputComponent";
import { View } from "react-native";
import GoogleButton from "../../components/auth/GoogleButton";
import useAuthService from "../../services/AuthService";
import useServiceCall from "../../utils/useServiceCall";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  const { login, loginGoogle } = useAuthService();

  const { executeService, loading } = useServiceCall();

  const handleLogin = () => {
    executeService(() =>
      login({
        email,
        password,
      })
    );
  };

  return (
    <MainView colors={colors} paddingHorizontal={4} alignCenter>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          margin: -40,
        }}
      >
        <LoginHeadline />

        <AuthInputComponent
          value={email}
          setValue={setEmail}
          placeholder={"Email"}
          autoComplete="email"
        />
        <AuthInputComponent
          value={password}
          setValue={setPassword}
          placeholder={"Password"}
          type="password"
          autoComplete="password"
          secure={true}
        />

        <Button
          mode="contained"
          style={{
            width: "85%",
            marginTop: 16,
            height: 45,
            justifyContent: "center",
          }}
          labelStyle={{ fontSize: 18 }}
          contentStyle={{ height: "100%" }}
          loading={loading}
          onPress={handleLogin}
        >
          Login
        </Button>
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 32,
          }}
        >
          <GoogleButton
            onSuccess={(token) => {
              loginGoogle(token);
            }}
            style={{ width: "85%" }}
          >
            Sign in with Google
          </GoogleButton>
        </View>
      </View>
    </MainView>
  );
}
