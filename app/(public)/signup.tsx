import * as React from "react";
import { Text, Input, Button, View } from "tamagui";
import { useSignUp } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../components/SignInWIthOAuth";
import { MyStack } from "../../components/styled/MyStack";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <MyStack>
      {!pendingVerification && (
        <View space>
          <View>
            <Input
              autoCapitalize="none"
              value={username}
              placeholder="Username..."
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
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

          <Button theme="orange" onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </Button>
        </View>
      )}
      {pendingVerification && (
        <View space>
          <View>
            <Input
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button theme="orange" onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </Button>
        </View>
      )}
      {/* <SignInWithOAuth /> */}
    </MyStack>
  );
}
