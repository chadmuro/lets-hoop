import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, H1 } from "tamagui";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function App() {
  const { isLoaded, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <H1>Let's Hoop</H1>
      {/* <Link href="/login" asChild>
        <Button size="$3" theme="active">
          Login
        </Button>
      </Link> */}
      <Button onPress={() => signOut()}>Sign out</Button>
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
