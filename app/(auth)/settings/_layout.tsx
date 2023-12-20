import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function SettingsLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.orange1.get(),
        headerStyle: {
          backgroundColor: theme.orange10.get(),
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          headerTitle: "Favorites",
        }}
      />
    </Stack>
  );
}
