import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import {
  useLocation,
  DEFAULT_LOCATION,
} from "../../../contexts/locationContext";

export default function Map() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
      mapRef?.current?.animateToRegion(location);
    }
  }, [location]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={location ?? DEFAULT_LOCATION}
      userInterfaceStyle="light"
      showsUserLocation
      showsMyLocationButton
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
