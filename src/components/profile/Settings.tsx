import { View } from "react-native";
import { useSettings } from "../../states/SettingsContext";
import { Chip, Divider, Text } from "react-native-paper";
export const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <View style={{ marginBottom: 16, width: "90%" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
        Settings
      </Text>

      {/* <ConnectGoogleAccount /> */}

      <Text variant="headlineSmall">Theme</Text>

      <View style={{ marginVertical: 12 }}>
        <ThemeButtom
          label="Light Theme"
          selected={settings.theme === "default-light"}
          onClick={() =>
            updateSettings((prev) => ({ ...prev, theme: "default-light" }))
          }
        />
        <ThemeButtom
          label="Dark Theme"
          selected={settings.theme === "default-dark"}
          onClick={() =>
            updateSettings((prev) => ({ ...prev, theme: "default-dark" }))
          }
        />
        <ThemeButtom
          label="System"
          selected={settings.theme === "default-system"}
          onClick={() =>
            updateSettings((prev) => ({ ...prev, theme: "default-system" }))
          }
        />

        <ThemeButtom
          label="Material You"
          selected={settings.theme === "colors-system"}
          onClick={() =>
            updateSettings((prev) => ({ ...prev, theme: "colors-system" }))
          }
        />
      </View>
      <Divider style={{ marginVertical: 6 }} />
    </View>
  );
};

const ThemeButtom = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Chip
      style={{ marginVertical: 3, paddingVertical: 3 }}
      showSelectedOverlay
      selected={selected}
      onPress={onClick}
    >
      <Text>{label}</Text>
    </Chip>
  );
};
