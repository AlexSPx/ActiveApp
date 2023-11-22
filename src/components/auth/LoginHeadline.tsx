import React from "react";
import { Text } from "react-native-paper";

export default function LoginHeadline() {
  return (
    <Text
      variant="headlineSmall"
      style={{
        width: "70%",
        textAlign: "center",
        marginBottom: 16,
        fontWeight: "bold",
      }}
    >
      Login to your account
    </Text>
  );
}
