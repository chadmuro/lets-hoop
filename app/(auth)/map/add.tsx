import { Text, Input, Button, Label, View, RadioGroup, XStack } from "tamagui";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { MyStack } from "../../../components/styled/MyStack";
import {
  useLocation,
  DEFAULT_LOCATION,
} from "../../../contexts/locationContext";
import { useCourtStore } from "../../../stores/courtStore";
import { useSupabase } from "../../../contexts/supabaseContext";
import { useUser } from "@clerk/clerk-expo";

export default function Add() {
  const { location } = useLocation();
  const { supabase } = useSupabase();
  const user = useUser();
  const startingLocation = location ?? DEFAULT_LOCATION;

  const [name, setName] = useState("");
  const [numberOfHoops, setNumberOfHoops] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState<string>("0");
  const [coordinates, setCoordinates] = useState({
    latitude: startingLocation.latitude,
    longitude: startingLocation.longitude,
  });
  const courts = useCourtStore((state) => state.courts);
  const addCourt = useCourtStore((state) => state.addCourt);

  async function onCourtSave() {
    await addCourt({
      supabase,
      user_id: user.user?.id as string,
      indoor_outdoor: Number(indoorOutdoor),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      name,
      number_of_hoops: Number(numberOfHoops),
    });
  }

  return (
    <MyStack>
      <View>
        <Input
          placeholder="Court name"
          id="name"
          returnKeyType="done"
          value={name}
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View>
        <Input
          placeholder="Number of hoops"
          id="hoops"
          returnKeyType="done"
          keyboardType="number-pad"
          value={numberOfHoops}
          onChangeText={(num) => setNumberOfHoops(num)}
        />
      </View>
      <View>
        <RadioGroup
          aria-labelledby="Select one item"
          value={indoorOutdoor}
          onValueChange={(val) => setIndoorOutdoor(val)}
          name="indoor_outdoor"
        >
          <XStack alignItems="center" space="$4">
            <XStack alignItems="center" space="$2">
              <RadioGroup.Item value="0" id="indoor" size="$4">
                <RadioGroup.Indicator />
              </RadioGroup.Item>

              <Label size="$4" htmlFor="indoor">
                Indoor
              </Label>
            </XStack>
            <XStack alignItems="center" space="$2">
              <RadioGroup.Item value="1" id="outdoor" size="$4">
                <RadioGroup.Indicator />
              </RadioGroup.Item>

              <Label size="$4" htmlFor="outdoor">
                Outdoor
              </Label>
            </XStack>
          </XStack>
        </RadioGroup>
      </View>
      <View>
        <Text pb="$2">Select location on map</Text>
        <MapView
          style={{ width: "100%", height: 300 }}
          initialRegion={{
            ...startingLocation,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0071,
          }}
          userInterfaceStyle="light"
        >
          <Marker
            coordinate={coordinates}
            draggable
            onDragEnd={(e) =>
              setCoordinates({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }
          />
        </MapView>
      </View>
      <Button theme="orange" onPress={onCourtSave}>
        Submit
      </Button>
    </MyStack>
  );
}
