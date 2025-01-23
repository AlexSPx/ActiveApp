import React, { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import MainView from "../../components/MainView";
import { View } from "react-native";
import RegisterHeadline from "../../components/auth/RegisterHeadline";
import { AuthInputComponent } from "../../components/auth/AuthInputComponent";
import useAuthService from "../../services/AuthService";
import useServiceCall from "../../utils/useServiceCall";

export default function Register() {
  const { colors } = useTheme();

  const { register, registerGoogle } = useAuthService();
  const { executeService, loading } = useServiceCall();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleRegister = async () => {
    executeService(
      async () =>
        await register({
          username,
          firstname,
          lastname,
          email,
          password,
          cpassword,
        })
    );
  };

  const handleGoogleRegister = async (idToken: string) => {
    executeService(async () => {
      await registerGoogle(idToken);
    });
  };

  return (
    <MainView colors={colors} paddingHorizontal={4} alignCenter>
      <View
        style={{
          width: "100%",
          height: "85%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterHeadline />

        <AuthInputComponent
          value={username}
          setValue={setUsername}
          placeholder={"Username"}
          autoComplete="username"
        />
        <AuthInputComponent
          value={firstname}
          setValue={setFirstname}
          placeholder={"First Name"}
          autoComplete="name-given"
        />
        <AuthInputComponent
          value={lastname}
          setValue={setLastname}
          placeholder={"Last Name"}
          autoComplete="name-family"
        />
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
          secure={true}
        />
        <AuthInputComponent
          value={cpassword}
          setValue={setCpassword}
          placeholder={"Confirm Password"}
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
          onPress={handleRegister}
          loading={loading}
        >
          Register
        </Button>
      </View>

    </MainView>
  );
}
