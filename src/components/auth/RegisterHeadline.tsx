import React from "react";
import { Text } from "react-native-paper";

export default function RegisterHeadline() {
  return (
    <Text
      variant="headlineSmall"
      style={{
        width: "70%",
        textAlign: "center",
        marginBottom: 4,
        fontWeight: "bold",
      }}
    >
      Register new account
    </Text>
  );
}
