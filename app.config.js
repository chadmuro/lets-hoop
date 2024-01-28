module.exports = {
  expo: {
    scheme: "lets-hoop",
    name: "lets-hoop",
    slug: "lets-hoop",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.chadmuro.letshoop",
      buildNumber: "4",
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-image-picker",
        {
          "photosPermission": "Let's Hoop accesses your photos to upload as your avatar image."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Let's Hoop uses your location to find courts near you."
        }
      ],
      "expo-router"
    ],
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "0564a2d8-5715-44d5-a117-1052b6c164b0"
      }
    }
  }
}
