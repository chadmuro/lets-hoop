import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import {
  useLocation,
  DEFAULT_LOCATION,
} from "../../../contexts/locationContext";
import { useCourtStore } from "../../../stores/courtStore";
import { useSupabase } from "../../../contexts/supabaseContext";

export default function Map() {
  const mapRef = useRef<MapView | null>(null);
  const { location } = useLocation();
  const { supabase } = useSupabase();
  const fetchCourts = useCourtStore((state) => state.fetchCourts);
  const courts = useCourtStore((state) => state.courts);

  useEffect(() => {
    if (supabase) {
      fetchCourts(supabase);
    }
  }, [supabase]);

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
    >
      {courts.map((court) => (
        <Marker
          key={court.id}
          coordinate={{ latitude: court.latitude, longitude: court.longitude }}
          title={court.name}
          description={`${court.number_of_hoops} hoops`}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
