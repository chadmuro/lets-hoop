import { useState } from "react";
import { Avatar, ListItem, Separator, YGroup, View, Button } from "tamagui";
import { useUser } from "@clerk/clerk-expo";
import {
  ChevronRight,
  User,
  KeyRound,
  Mail,
  Camera,
  Trash,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { MyStack } from "../../../../components/styled/MyStack";
import { Alert } from "react-native";

export default function Profile() {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const pickImage = async () => {
    setIsUploadingImage(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage("data:image/jpeg;base64," + result.assets[0].base64);
      if (user) {
        const newUser = await user.setProfileImage({
          file: "data:image/jpeg;base64," + result.assets[0].base64,
        });

        if (newUser) {
        }
      }
    }
    setIsUploadingImage(false);
  };

  function showDeleteAccountAlert() {
    Alert.alert(
      "Are you sure you want to delete your account?",
      "Once deleted your account cannot be recovered.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => await user?.delete(),
        },
      ]
    );
  }

  return (
    <>
      {isUploadingImage && <LoadingOverlay />}
      <MyStack>
        <View position="relative">
          <Avatar circular size="$10">
            <Avatar.Image src={selectedImage ?? user?.imageUrl} />
            <Avatar.Fallback bc="orange" />
          </Avatar>
          <Button
            position="absolute"
            top={80}
            left={70}
            size="$2"
            theme="orange"
            onPress={pickImage}
          >
            <Camera size="$1.5" />
          </Button>
        </View>
        <YGroup theme="orange" alignSelf="center" separator={<Separator />}>
          <YGroup.Item>
            <Link href="/settings/profile/username" asChild>
              <ListItem
                hoverTheme
                pressTheme
                title="Username"
                subTitle={user?.username}
                icon={User}
                iconAfter={ChevronRight}
              />
            </Link>
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Email"
              subTitle={user?.primaryEmailAddress?.emailAddress}
              icon={Mail}
            />
          </YGroup.Item>
          <YGroup.Item>
            <Link href="/settings/profile/password" asChild>
              <ListItem
                hoverTheme
                pressTheme
                title="Change password"
                icon={KeyRound}
                iconAfter={ChevronRight}
              />
            </Link>
          </YGroup.Item>
        </YGroup>
        <YGroup theme="red" alignSelf="flex-end" separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Delete account"
              icon={Trash}
              iconAfter={ChevronRight}
              color="$red10"
              alignItems="center"
              onPress={showDeleteAccountAlert}
            />
          </YGroup.Item>
        </YGroup>
      </MyStack>
    </>
  );
}
