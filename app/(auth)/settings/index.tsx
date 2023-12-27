import { ListItem, Separator, YGroup } from "tamagui";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { MyStack } from "../../../components/styled/MyStack";
import { Link } from "expo-router";
import {
  Mail,
  ChevronRight,
  ClipboardCopy,
  Pencil,
  User,
  Trash,
  LogOut,
  Star,
} from "@tamagui/lucide-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function Settings() {
  const { signOut } = useAuth();
  const { user } = useUser();

  async function copyToClipboard() {
    await Clipboard.setStringAsync("chadmurodev@gmail.com");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Email copied to clipboard",
      "👋 Looking forward to hearing from you soon!"
    );
  }

  function showSignOutAlert() {
    Alert.alert("Are you sure you want to sign out?", "", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => signOut() },
    ]);
  }

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
    <MyStack>
      <YGroup theme="orange" alignSelf="center" separator={<Separator />}>
        <YGroup.Item>
          <Link href="/settings/profile" asChild>
            <ListItem
              hoverTheme
              pressTheme
              title="Profile"
              icon={User}
              iconAfter={ChevronRight}
            />
          </Link>
        </YGroup.Item>
        <YGroup.Item>
          <Link href="/settings/favorites" asChild>
            <ListItem
              hoverTheme
              pressTheme
              title="Favorites"
              icon={Star}
              iconAfter={ChevronRight}
            />
          </Link>
        </YGroup.Item>
      </YGroup>

      <YGroup theme="orange" alignSelf="center" separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Open default mail app"
            icon={Mail}
            iconAfter={ChevronRight}
            onPress={() => Linking.openURL("mailto:chadmurodev@gmail.com")}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Copy email to clipboard"
            icon={ClipboardCopy}
            iconAfter={ChevronRight}
            onPress={copyToClipboard}
          />
        </YGroup.Item>
        {/* <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Write a review"
            icon={Pencil}
            iconAfter={ChevronRight}
          />
        </YGroup.Item> */}
      </YGroup>

      <YGroup theme="red" alignSelf="center" separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Sign out"
            icon={LogOut}
            iconAfter={ChevronRight}
            color="$red10"
            alignItems="center"
            onPress={showSignOutAlert}
          />
        </YGroup.Item>
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
  );
}
