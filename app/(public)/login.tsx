import React from "react";
import { Alert, Text, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Input, Button } from "tamagui";
import { Link } from "expo-router";
import { MyStack } from "../../components/styled/MyStack";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    }
  };
  return (
    <MyStack>
      <View>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <Input
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button theme="orange" onPress={onSignInPress}>
        <Text>Sign in</Text>
      </Button>

      <Link href="/signup">Create account</Link>
    </MyStack>
  );
}
