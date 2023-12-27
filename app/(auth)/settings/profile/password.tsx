import { H3, Form, Button, Input } from "tamagui";
import { useState } from "react";
import { MyStack } from "../../../../components/styled/MyStack";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Password() {
  const { user } = useUser();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSavePress = async () => {
    if (user) {
      const newUser = await user.updatePassword({
        newPassword,
        currentPassword,
        signOutOfOtherSessions: true,
      });
      console.log(newUser);
      if (newUser) {
        router.back();
      }
    }
  };

  return (
    <MyStack>
      <H3>Change password</H3>
      <Form onSubmit={onSavePress} space>
        <Input
          value={currentPassword}
          placeholder="Current password..."
          secureTextEntry={true}
          onChangeText={(password) => setCurrentPassword(password)}
        />
        <Input
          value={newPassword}
          placeholder="New password..."
          secureTextEntry={true}
          onChangeText={(password) => setNewPassword(password)}
        />
        <Form.Trigger asChild>
          <Button theme="orange">Save</Button>
        </Form.Trigger>
      </Form>
    </MyStack>
  );
}
