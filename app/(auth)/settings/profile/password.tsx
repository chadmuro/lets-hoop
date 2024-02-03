import { H3, Form, Button, Input } from "tamagui";
import { useState } from "react";
import { MyStack } from "../../../../components/styled/MyStack";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function Password() {
  const { user } = useUser();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSavePress = async () => {
    if (!currentPassword) {
      return Alert.alert("Enter current password");
    }
    if (newPassword.length < 8) {
      return Alert.alert("Passwords must be 8 characters or more.");
    }
    if (user) {
      try {
        const newUser = await user.updatePassword({
          newPassword,
          currentPassword,
          signOutOfOtherSessions: true,
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
