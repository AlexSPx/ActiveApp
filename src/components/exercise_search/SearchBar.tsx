import {
  ActivityIndicator,
  Keyboard,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import EIcon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconButton, TextInput, TouchableRipple } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type SearchBarProps = {
  title: string;
  colors: MD3Colors;
  loading: boolean;
  setTitle: (t: string) => void;
  executeSearch: () => {};
};

type SearchProps = NativeStackNavigationProp<any>;

export default function SearchBar({
  title,
  setTitle,
  colors,
  executeSearch,
  loading,
}: SearchBarProps) {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const navigation = useNavigation<SearchProps>();

  useEffect(() => {
    const keyBoardShown = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const keyBoardHidden = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      keyBoardShown.remove();
      keyBoardHidden.remove();
    };
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 15,
        width: "97%",
        flexDirection: "row",
        backgroundColor: colors.background,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextInput
        mode="outlined"
        style={{
          width: "85%",
          padding: 2,
          paddingHorizontal: 20,
          justifyContent: "center",
          fontSize: 18,
          marginVertical: 10,
        }}
        theme={{ roundness: 30 }}
        right={
          <TextInput.Icon
            icon={(props) =>
              loading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <TouchableRipple>
                  <EIcon
                    onPress={executeSearch}
                    name="search"
                    size={props.size + 10}
                    color={props.color}
                    style={{ paddingBottom: 7 }}
                  />
                </TouchableRipple>
              )
            }
          />
        }
        placeholder={"Enter exercise name"}
        value={title}
        onChangeText={(e) => setTitle(e)}
        onSubmitEditing={executeSearch}
      />
      <IconButton
        icon="menu"
        size={45}
        style={{ marginTop: 9.5 }}
        onPress={() => navigation.navigate("filters")}
      />
    </View>
  );
}
