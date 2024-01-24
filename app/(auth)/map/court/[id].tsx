import { Button, Text, YStack } from "tamagui";
import { Image } from "expo-image";
import { MyStack } from "../../../../components/styled/MyStack";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useCourtStore } from "../../../../stores/courtStore";
import { Pressable } from "react-native";
import { Star } from "@tamagui/lucide-icons";

export default function Court() {
  const { id } = useGlobalSearchParams();
  const courts = useCourtStore((state) => state.courts);

  const courtData = courts.find((court) => court.id === Number(id));

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: courtData?.name,
          headerRight: () => (
            <Pressable>
              <Star color="white" />
            </Pressable>
          ),
        }}
      />
      <MyStack padding="$0">
        <Image
          source="https://images.unsplash.com/photo-1615174438196-b3538fe68737?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          contentFit="cover"
          style={{ width: "100%", height: 300 }}
        />
        <YStack px="$4">
          <Text>Number of hoops: {courtData?.number_of_hoops}</Text>
          <Text>{courtData?.indoor_outdoor === 0 ? "Indoor" : "Outdoor"}</Text>
          <Button>Add Image</Button>
        </YStack>
      </MyStack>
    </>
  );
}
