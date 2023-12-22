import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { useRef } from "react";

export default function Map() {
  const mapRef = useRef<MapView | null>(null);
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: 35.658,
        longitude: 139.7016,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      userInterfaceStyle="light"
      showsUserLocation
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
