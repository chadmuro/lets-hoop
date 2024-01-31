import {
  Button,
  H3,
  ScrollView,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { MyStack } from "../../../../components/styled/MyStack";
import { Link, useGlobalSearchParams } from "expo-router";
import { useCourtStore } from "../../../../stores/courtStore";
import { Alert, Dimensions, TouchableOpacity } from "react-native";
import { Star, X } from "@tamagui/lucide-icons";
import { useFavoriteStore } from "../../../../stores/favoriteStore";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useCourtDetailStore } from "../../../../stores/courtDetailStore";
import { useEffect } from "react";
import CheckinList from "../../../../components/court/CheckinList";

export default function Court() {
  const { id } = useGlobalSearchParams();
  const courts = useCourtStore((state) => state.courts);
  const courtData = courts.find((court) => court.id === Number(id));
  const theme = useTheme();
  const user = useUser();
  const favorites = useFavoriteStore((state) => state.favorites);
  const updating = useFavoriteStore((state) => state.updating);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const deleteFavorite = useFavoriteStore((state) => state.deleteFavorite);
  const addCheckin = useCourtDetailStore((state) => state.addCheckin);
  const uploadImage = useCourtDetailStore((state) => state.uploadImage);
  const updatingCheckin = useCourtDetailStore((state) => state.updatingCheckin);
  const fetchCheckins = useCourtDetailStore((state) => state.fetchCheckins);
  const fetchImages = useCourtDetailStore((state) => state.fetchImages);
  const loadingImages = useCourtDetailStore((state) => state.loadingImages);
  const loadingCheckins = useCourtDetailStore((state) => state.loadingCheckins);
  const courtDetail = useCourtDetailStore((state) => state.courtDetail);
  const resetCourtDetail = useCourtDetailStore(
    (state) => state.resetCourtDetail
  );
  const { getToken } = useAuth();

  useEffect(() => {
    async function initialLoad() {
      const token = await getToken({ template: "supabase" });
      if (!token) return;

      fetchCheckins({
        id: Number(id),
        token,
      });
      fetchImages({
        id: Number(id),
        token,
      });
    }

    initialLoad();

    return () => resetCourtDetail();
  }, []);

  const selectedFavorite = favorites.find(
    (favorite) => favorite.court_id === Number(id)
  );

  async function toggleFavorite() {
    const token = await getToken({ template: "supabase" });
    if (!token) return;

    if (selectedFavorite) {
      deleteFavorite({
        id: selectedFavorite.id,
        user_id: selectedFavorite.user_id,
        token,
      });
    } else {
      if (!user.user?.id) return;
      addFavorite({
        court_id: Number(id),
        user_id: user.user?.id,
        token,
      });
    }
  }

  function onCheckinPress() {
    Alert.alert("Are you sure you want to check-in here?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Check-in",
        onPress: async () => {
          const token = await getToken({ template: "supabase" });
          if (!user.user) return;
          if (!token) return;
          addCheckin({
            court_id: Number(id),
            username: user.user.username,
            avatar: user.user.imageUrl,
            token,
          });
        },
      },
    ]);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      if (img.fileSize! > 10485760) {
        return Alert.alert("Image size is too large");
      }
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${courtData?.id}/${new Date().getTime()}.png`;
      const token = await getToken({ template: "supabase" });
      if (!token || typeof courtData?.id !== "number") return;
      await uploadImage({ id: courtData?.id, base64, filePath, token });
    }
  };

  let imageMain: React.ReactNode = null;
  if (loadingImages) {
    imageMain = (
      <View style={{ width: "100%", height: "45%" }}>
        <Spinner
          size="large"
          color="$orange10"
          style={{ width: "100%", height: "45%", marginTop: "auto" }}
        />
      </View>
    );
  } else if (!loadingImages && courtDetail?.images.length === 0) {
    imageMain = (
      <>
        <Image
          source="https://images.unsplash.com/photo-1615174438196-b3538fe68737?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          contentFit="cover"
          style={{ width: "100%", height: "45%" }}
        />
        <Link href="/map" asChild>
          <Button
            position="absolute"
            top={10}
            right={10}
            size="$2"
            theme="orange"
          >
            <X size="$1" />
          </Button>
        </Link>
      </>
    );
  } else if (!loadingImages && courtDetail?.images.length === 1) {
    imageMain = (
      <>
        <Image
          source={courtDetail.images[0]}
          contentFit="cover"
          style={{ width: "100%", height: "45%" }}
        />
        <Link href="/map" asChild>
          <Button
            position="absolute"
            top={10}
            right={10}
            size="$2"
            theme="orange"
          >
            <X size="$1" />
          </Button>
        </Link>
      </>
    );
  } else {
    imageMain = (
      <View style={{ width: "100%", height: "45%" }}>
        <ScrollView
          horizontal
          pagingEnabled
          style={{ width: "100%", height: "45%" }}
        >
          {courtDetail?.images.map((image, index) => (
            <Image
              key={index}
              source={
                image
                  ? image
                  : "https://images.unsplash.com/photo-1615174438196-b3538fe68737?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              contentFit="cover"
              style={{ width: Dimensions.get("window").width, height: "100%" }}
            />
          ))}
        </ScrollView>
        <Link href="/map" asChild>
          <Button
            position="absolute"
            top={10}
            right={10}
            size="$2"
            theme="orange"
          >
            <X size="$1" />
          </Button>
        </Link>
      </View>
    );
  }

  return (
    <MyStack padding="$0">
      {imageMain}
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
          <Button theme="orange" onPress={pickImage}>
            Add Image
          </Button>
          <Button
            theme="orange"
            onPress={onCheckinPress}
            disabled={updatingCheckin}
          >
            Check-in
          </Button>
          <CheckinList loading={loadingCheckins} courtDetail={courtDetail} />
          <Link href="/map" asChild>
            <Button>Back to map</Button>
          </Link>
        </YStack>
      </ScrollView>
    </MyStack>
  );
}
