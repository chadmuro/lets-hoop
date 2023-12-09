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
      "expo-router"
    ],
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY
    }
  }
}
