import { TamaguiProvider } from "tamagui";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

import config from "../tamagui.config";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/map");
    } else if (!isSignedIn && inTabsGroup) {
      router.replace("/login");
    } else {
      SplashScreen.hideAsync();
      return;
    }
  }, [isSignedIn]);

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(public)"
        listeners={{ transitionEnd: () => SplashScreen.hideAsync() }}
      />
      <Stack.Screen
        name="(auth)"
        listeners={{ transitionEnd: () => SplashScreen.hideAsync() }}
      />
    </Stack>
  );
}

export default function RootLayout() {
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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <TamaguiProvider config={config}>
        <InitialLayout />
      </TamaguiProvider>
    </ClerkProvider>
  );
}
