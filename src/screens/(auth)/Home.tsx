import { useTheme } from "react-native-paper";
import MainView from "../../components/MainView";

import { Text } from "react-native-paper";
import { useRecoilState } from "recoil";
import { authState } from "../../states/authState";

export default function Home() {
  const { colors } = useTheme();

  const [auth, _] = useRecoilState(authState);

  return (
    <MainView colors={colors}>
      <Text variant="headlineLarge" style={{ textAlign: "center" }}>
        Welcome, {auth.user?.username} {"\n"} to Active.
      </Text>

      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        The app is still in beta(alpha even) {"\n"}
        so not everyting is finished.
      </Text>
    </MainView>
  );
}
