import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import {
  useLocation,
  DEFAULT_LOCATION,
} from "../../../contexts/locationContext";
import { useCourtStore } from "../../../stores/courtStore";
import { useSupabase } from "../../../contexts/supabaseContext";
import { MapPin } from "@tamagui/lucide-icons";
import CustomCallout from "../../../components/map/CustomCallout";

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
        >
          <MapPin color="$red10" fill="orange" />
          <Callout>
            <CustomCallout
              title={court.name}
              number_of_hoops={court.number_of_hoops}
            />
          </Callout>
        </Marker>
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
