import { Text, Input, Button, Label, View, YStack } from "tamagui";
import MapView, { Marker } from "react-native-maps";
import { MyStack } from "../../../components/styled/MyStack";

const INITIAL_REGION = {
  latitude: 35.658,
  longitude: 139.7016,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Add() {
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
          initialRegion={INITIAL_REGION}
          userInterfaceStyle="light"
        >
          <Marker coordinate={INITIAL_REGION} draggable />
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
