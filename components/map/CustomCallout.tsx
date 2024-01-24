import { View, Text, Anchor } from "tamagui";
import { Star } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

interface Props {
  id: number;
  title: string;
  number_of_hoops: number;
}

export default function CustomCallout({ id, title, number_of_hoops }: Props) {
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
        <TouchableOpacity>
          <Star />
        </TouchableOpacity>
      </View>
    </View>
  );
}
