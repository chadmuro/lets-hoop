import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function PublicLayout() {
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
        name="login"
        options={{
          headerTitle: "Sign in",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign up",
        }}
      />
    </Stack>
  );
}
