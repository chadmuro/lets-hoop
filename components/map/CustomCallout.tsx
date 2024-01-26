import { View, Text, Anchor, useTheme } from "tamagui";
import { Star } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useFavoriteStore } from "../../stores/favoriteStore";
import { useSupabase } from "../../contexts/supabaseContext";
import { useUser } from "@clerk/clerk-expo";

interface Props {
  id: number;
  title: string;
  number_of_hoops: number;
}

export default function CustomCallout({ id, title, number_of_hoops }: Props) {
  const theme = useTheme();
  const { supabase } = useSupabase();
  const user = useUser();
  const favorites = useFavoriteStore((state) => state.favorites);
  const updating = useFavoriteStore((state) => state.updating);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const deleteFavorite = useFavoriteStore((state) => state.deleteFavorite);

  const selectedFavorite = favorites.find(
    (favorite) => favorite.court_id === id
  );

  function toggleFavorite() {
    if (selectedFavorite) {
      deleteFavorite({
        id: selectedFavorite.id,
        user_id: selectedFavorite.user_id,
        supabase,
      });
    } else {
      if (!user.user?.id) return;
      addFavorite({
        court_id: Number(id),
        user_id: user.user?.id,
        supabase,
      });
    }
  }

  return (
    <View
      width={200}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
    >
      <View>
        <Text>{title}</Text>
        <Text>{`${number_of_hoops} hoops`}</Text>
        <Text></Text>

        <Link href={`/map/court/${id}`}>Details</Link>
      </View>
      <View>
        <TouchableOpacity onPress={toggleFavorite} disabled={updating}>
          <Star
            fill={selectedFavorite ? theme.yellow7.get() : "white"}
            color={selectedFavorite ? theme.yellow7.get() : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
