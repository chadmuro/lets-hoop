import { H3, Form, Button, Input } from "tamagui";
import { useState } from "react";
import { MyStack } from "../../../../components/styled/MyStack";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Username() {
  const { user } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState(user?.username || "");

  const onSavePress = async () => {
    if (user) {
      const newUser = await user.update({
        username,
      });
      console.log(newUser);
      if (newUser) {
        router.back();
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
