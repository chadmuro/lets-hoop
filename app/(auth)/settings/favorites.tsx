import { Text, View } from "tamagui";
import { MyStack } from "../../../components/styled/MyStack";
import { useFavoriteStore } from "../../../stores/favoriteStore";

export default function Favorites() {
  const favorites = useFavoriteStore((state) => state.favorites);

  let favoritesMain: React.ReactNode = null;

  if (favorites.length === 0) {
    favoritesMain = <Text>No favorites</Text>;
  } else {
    favoritesMain = favorites.map((favorite) => {
      return (
        <View key={favorite.id}>
          <Text>{favorite.court?.name}</Text>
        </View>
      );
    });
  }

  return <MyStack>{favoritesMain}</MyStack>;
}
