import { StatusBar } from "expo-status-bar";
import { Button, H1 } from "tamagui";
import { useAuth } from "@clerk/clerk-expo";
import { MyStack } from "../../../components/styled/MyStack";

export default function Map() {
  const { isLoaded, signOut } = useAuth();

  return (
    <MyStack>
      <H1>Let's Hoop</H1>
      <Button onPress={() => signOut()}>Sign out</Button>
      <StatusBar style="auto" />
    </MyStack>
  );
}
