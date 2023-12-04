import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import config from "../tamagui.config";
import { useEffect } from "react";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Stack />
    </TamaguiProvider>
  );
}
