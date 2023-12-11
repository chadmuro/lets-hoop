import { StyleSheet, View } from "react-native";
import { Button, H1, YStack } from "tamagui";
import { Image } from "expo-image";
import { Link } from "expo-router";

const StartPage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        contentFit="cover"
        transition={1000}
      >
        <View style={styles.child} />
      </Image>
      <YStack position="absolute" space>
        <H1 color="white" textAlign="center">
          Welcome to Let's Hoop!
        </H1>

        <Link href="/login" asChild>
          <Button>Login</Button>
        </Link>
      </YStack>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
