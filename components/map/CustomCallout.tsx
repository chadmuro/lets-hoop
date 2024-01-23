import { View, Text, Anchor } from "tamagui";
import { Star } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";

interface Props {
  title: string;
  number_of_hoops: number;
}

export default function CustomCallout({ title, number_of_hoops }: Props) {
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

        <Anchor>Details</Anchor>
      </View>
      <View>
        <TouchableOpacity>
          <Star />
        </TouchableOpacity>
      </View>
    </View>
  );
}
