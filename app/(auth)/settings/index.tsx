import { ListItem, Separator, YGroup } from "tamagui";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { MyStack } from "../../../components/styled/MyStack";
import { Link } from "expo-router";
import * as MailComposer from "expo-mail-composer";
import {
  Mail,
  ChevronRight,
  ClipboardCopy,
  Pencil,
  User,
  LogOut,
  Star,
} from "@tamagui/lucide-icons";
import { useAuth } from "@clerk/clerk-expo";

export default function Settings() {
  const { signOut } = useAuth();

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

  async function onContactPress() {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      const mailResult = await MailComposer.composeAsync({
        recipients: ["chadmurodev@gmail.com"],
        subject: `Let's Hoop: General contact`,
      });

      if (mailResult.status === MailComposer.MailComposerStatus.SENT) {
        Alert.alert(
          "Thank you for your email!",
          "🤙 We will get back to you as soon as possilble"
        );
      }
    } else {
      Linking.openURL("mailto:chadmurodev@gmail.com");
    }
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
            title="Send an email"
            icon={Mail}
            iconAfter={ChevronRight}
            onPress={onContactPress}
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
      </YGroup>
    </MyStack>
  );
}
