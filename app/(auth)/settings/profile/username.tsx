import { H3, Form, Button, Input } from "tamagui";
import { useState } from "react";
import { MyStack } from "../../../../components/styled/MyStack";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function Username() {
  const { user } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState(user?.username || "");

  const onSavePress = async () => {
    if (username.length < 4 || username.length > 64) {
      return Alert.alert("Username must be between 4 and 64 characters long.");
    }
    if (user) {
      try {
        const newUser = await user.update({
          username,
        });
        if (newUser) {
          router.back();
        }
      } catch (err: any) {
        Alert.alert(err.errors[0].message);
      }
    }
  };

  return (
    <MyStack>
      <H3>Update username</H3>
      <Form onSubmit={onSavePress} space>
        <Input
          autoCapitalize="none"
          value={username}
          placeholder="Username..."
          onChangeText={(username) => setUsername(username)}
        />
        <Form.Trigger asChild>
          <Button theme="orange">Save</Button>
        </Form.Trigger>
      </Form>
    </MyStack>
  );
}
