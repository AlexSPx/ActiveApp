import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { TextInputIOSProps } from "react-native";

type AuthInputCustomProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: TextInputIOSProps["textContentType"];
  secure?: boolean;
} & TextInputProps;

export function AuthInputComponent({
  value,
  setValue,
  type,
  secure = false,
  ...rest
}: AuthInputCustomProps) {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      textContentType={type}
      secureTextEntry={secure}
      mode="flat"
      placeholder={"pHolder"}
      style={{
        fontSize: 16,
        marginVertical: 4,
        width: "85%",
      }}
      {...rest}
    />
  );
}
