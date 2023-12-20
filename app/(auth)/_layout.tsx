import { Tabs } from "expo-router/tabs";
import { useTheme } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTintColor: theme.orange1.get(),
        headerStyle: {
          backgroundColor: theme.orange10.get(),
        },
        tabBarActiveTintColor: theme.orange10.get(),
      }}
    >
      <Tabs.Screen
        name="map/index"
        options={{
          headerTitle: "Map",
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "basketball" : "basketball-outline"}
              size={24}
              color={focused ? theme.orange10.get() : theme.gray10.get()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          headerTitle: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? theme.orange10.get() : theme.gray10.get()}
            />
          ),
        }}
      />
    </Tabs>
  );
}
