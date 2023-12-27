import { Avatar, ListItem, Separator, YGroup, View, Button } from "tamagui";
import { useUser } from "@clerk/clerk-expo";
import {
  ChevronRight,
  User,
  KeyRound,
  Mail,
  Camera,
} from "@tamagui/lucide-icons";
import { MyStack } from "../../../../components/styled/MyStack";
import { Link } from "expo-router";

export default function Profile() {
  const { user } = useUser();

  return (
    <MyStack>
      <View position="relative">
        <Avatar circular size="$8">
          <Avatar.Image src={user?.imageUrl} />
          <Avatar.Fallback bc="orange" />
        </Avatar>
        <Button
          position="absolute"
          top={60}
          left={50}
          size="$1.5"
          theme="orange"
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
    </MyStack>
  );
}
