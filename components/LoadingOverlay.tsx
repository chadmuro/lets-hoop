import { BlurView } from "expo-blur";
import { Spinner } from "tamagui";

export default function LoadingOverlay() {
  return (
    <BlurView
      intensity={10}
      style={{
        position: "absolute",
        display: "flex",
        height: "100%",
        width: "100%",
        padding: "50%",
        zIndex: 2,
      }}
    >
      <Spinner
        size="large"
        color="$orange10"
        justifyContent="center"
        alignItems="center"
      />
    </BlurView>
  );
}
