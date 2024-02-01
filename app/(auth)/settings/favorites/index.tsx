import { ListItem, Separator, Text, View, YGroup, useTheme } from "tamagui";
import { MyStack } from "../../../../components/styled/MyStack";
import { useFavoriteStore } from "../../../../stores/favoriteStore";
import { ChevronRight, Star } from "@tamagui/lucide-icons";
import { Link } from "expo-router";

export default function Favorites() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const theme = useTheme();

  let favoritesMain: React.ReactNode = null;

  if (favorites.length === 0) {
    favoritesMain = <Text>No favorites</Text>;
  } else {
    favoritesMain = (
      <YGroup theme="orange" alignSelf="center" separator={<Separator />}>
        {favorites.map((favorite) => (
          <YGroup.Item key={favorite.id}>
            <Link
              href={`/(auth)/settings/favorites/court/${favorite.court_id}`}
              asChild
            >
              <ListItem
                hoverTheme
                pressTheme
                title={favorite.court.name}
                icon={
                  <Star
                    fill={theme.yellow7.get()}
                    color={theme.yellow7.get()}
                  />
                }
                iconAfter={ChevronRight}
              />
            </Link>
          </YGroup.Item>
        ))}
      </YGroup>
    );
  }

  return <MyStack>{favoritesMain}</MyStack>;
}
