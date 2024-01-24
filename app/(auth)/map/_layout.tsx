import { Plus } from "@tamagui/lucide-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
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
          headerTitle: "Map",
          headerRight: () => (
            <Link href="/map/add" asChild>
              <Pressable>
                <Plus color={theme.orange1.get()} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add court",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="court/[id]"
        options={{
          headerTitle: "Court name",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
