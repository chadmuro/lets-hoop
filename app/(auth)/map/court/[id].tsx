import {
  Avatar,
  Button,
  H3,
  H5,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
import { Image } from "expo-image";
import dayjs from "dayjs";
import { MyStack } from "../../../../components/styled/MyStack";
import { Link, useGlobalSearchParams } from "expo-router";
import { useCourtStore } from "../../../../stores/courtStore";
import { Alert, TouchableOpacity } from "react-native";
import { Star } from "@tamagui/lucide-icons";
import { useFavoriteStore } from "../../../../stores/favoriteStore";
import { useSupabase } from "../../../../contexts/supabaseContext";
import { useUser } from "@clerk/clerk-expo";
import { useCourtDetailStore } from "../../../../stores/courtDetailStore";
import { useEffect } from "react";

export default function Court() {
  const { id } = useGlobalSearchParams();
  const { supabase } = useSupabase();
  const courts = useCourtStore((state) => state.courts);
  const courtData = courts.find((court) => court.id === Number(id));
  const theme = useTheme();
  const user = useUser();
  const favorites = useFavoriteStore((state) => state.favorites);
  const updating = useFavoriteStore((state) => state.updating);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const deleteFavorite = useFavoriteStore((state) => state.deleteFavorite);
  const addCheckin = useCourtDetailStore((state) => state.addCheckin);
  const updatingCheckin = useCourtDetailStore((state) => state.updating);
  const fetchCourtDetails = useCourtDetailStore(
    (state) => state.fetchCourtDetails
  );
  const loading = useCourtDetailStore((state) => state.loading);
  const courtDetail = useCourtDetailStore((state) => state.courtDetail);

  useEffect(() => {
    fetchCourtDetails({
      id: Number(id),
      supabase,
    });
  }, []);

  const selectedFavorite = favorites.find(
    (favorite) => favorite.court_id === Number(id)
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

  function onCheckinPress() {
    Alert.alert("Are you sure you want to checkin here?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Checkin",
        onPress: () => {
          if (!user.user) return;
          addCheckin({
            court_id: Number(id),
            username: user.user.username,
            avatar: user.user.imageUrl,
            supabase,
          });
        },
      },
    ]);
  }

  return (
    <MyStack padding="$0">
      <Image
        source="https://images.unsplash.com/photo-1615174438196-b3538fe68737?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        contentFit="cover"
        style={{ width: "100%", height: "45%" }}
      />
      <ScrollView>
        <YStack px="$4" pb="$6" space>
          <XStack ai="center" jc="space-between">
            <H3>{courtData?.name}</H3>
            <TouchableOpacity onPress={toggleFavorite} disabled={updating}>
              <Star
                size="$4"
                fill={selectedFavorite ? theme.yellow7.get() : "white"}
                color={selectedFavorite ? theme.yellow7.get() : "black"}
              />
            </TouchableOpacity>
          </XStack>
          <Text>Number of hoops: {courtData?.number_of_hoops}</Text>
          <Text>{courtData?.indoor_outdoor === 0 ? "Indoor" : "Outdoor"}</Text>
          <Button theme="orange">Add Image</Button>
          <Button
            theme="orange"
            onPress={onCheckinPress}
            disabled={updatingCheckin}
          >
            Check in
          </Button>
          <YStack space="$3">
            <H5>Recent check-ins</H5>
            {loading ? (
              <Spinner size="large" color="$orange10" />
            ) : courtDetail && courtDetail?.checkins.length > 0 ? (
              courtDetail?.checkins.map((checkin) => {
                return (
                  <XStack key={checkin.id} jc="space-between" ai="center">
                    <XStack ai="center">
                      <Avatar circular size="$3">
                        <Avatar.Image src={checkin.avatar ?? "https://test"} />
                        <Avatar.Fallback bc="orange" />
                      </Avatar>
                      <Text pl="$2">{checkin.username}</Text>
                    </XStack>
                    <Text>
                      {dayjs(checkin.created_at).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </XStack>
                );
              })
            ) : (
              <Text>No Checkins</Text>
            )}
          </YStack>
          <Link href="/map" asChild>
            <Button>Back to map</Button>
          </Link>
        </YStack>
      </ScrollView>
    </MyStack>
  );
}
