import { Text, Input, Button, Label, View, YStack } from "tamagui";
import MapView, { Marker } from "react-native-maps";
import { MyStack } from "../../../components/styled/MyStack";
import {
  useLocation,
  DEFAULT_LOCATION,
} from "../../../contexts/locationContext";

export default function Add() {
  const { location } = useLocation();

  return (
    <YStack
      paddingHorizontal="$4"
      space="$true"
      backgroundColor="$backgroundStrong"
      flex={1}
      justifyContent="flex-start"
    >
      <View>
        <Label htmlFor="name">Court name</Label>
        <Input placeholder="Court name" id="name" returnKeyType="done" />
      </View>
      <View>
        <Label>Select location on map</Label>
        <MapView
          style={{ width: "100%", height: 250 }}
          initialRegion={location ?? DEFAULT_LOCATION}
          userInterfaceStyle="light"
        >
          <Marker coordinate={location ?? DEFAULT_LOCATION} draggable />
        </MapView>
      </View>
      {/* <View>
        <Label htmlFor="type">Indoor/outdoor</Label>
        <Switch size="$4">
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </View> */}
      <Button theme="orange">Submit</Button>
    </YStack>
  );
}
