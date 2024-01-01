import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";
import { Region } from "react-native-maps";

type LocationContextType = {
  location: Region | null;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

const DEFAULT_LOCATION = {
  latitude: 35.658,
  longitude: 139.7016,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const LocationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [location, setLocation] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log(location);
    if (!location) {
      console.log("called");
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setLocation(DEFAULT_LOCATION);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: DEFAULT_LOCATION.latitudeDelta,
          longitudeDelta: DEFAULT_LOCATION.longitudeDelta,
        });
      })();
    }
  }, []);

  const value = { location };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation, DEFAULT_LOCATION };
