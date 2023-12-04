import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, H1 } from "tamagui";

export default function App() {
  return (
    <View style={styles.container}>
      <H1>Let's Hoop</H1>
      <Button size="$3" theme="active">
        Get Started
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
