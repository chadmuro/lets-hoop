import { Tabs } from "expo-router/tabs";
import { useTheme } from "tamagui";
import { Map, Settings } from "@tamagui/lucide-icons";
import { LocationProvider } from "../../contexts/locationContext";

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <LocationProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.orange10.get(),
          lazy: false,
        }}
      >
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ focused }) => (
              <Map
                color={focused ? theme.orange10.get() : theme.gray10.get()}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused }) => (
              <Settings
                color={focused ? theme.orange10.get() : theme.gray10.get()}
              />
            ),
          }}
        />
      </Tabs>
    </LocationProvider>
  );
}
