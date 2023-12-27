import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function ProfileLayout() {
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="username"
        options={{
          headerTitle: "Username",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerTitle: "Password",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
