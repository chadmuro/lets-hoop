import dayjs from "dayjs";
import { YStack, H5, Spinner, XStack, Avatar, Text } from "tamagui";
import { Checkin } from "../../types";

interface Props {
  loading: boolean;
  courtDetail: {
    checkins: Pick<
      Checkin,
      "id" | "created_at" | "user_id" | "username" | "avatar"
    >[];
  } | null;
}

export default function CheckinList({ loading, courtDetail }: Props) {
  let checkinListMain: React.ReactNode = null;
  if (loading) {
    checkinListMain = <Spinner size="large" color="$orange10" />;
  }
  if (!loading && courtDetail) {
    if (courtDetail.checkins.length === 0) {
      checkinListMain = <Text>No Check-ins</Text>;
    } else {
      checkinListMain = courtDetail?.checkins.map((checkin) => {
        return (
          <XStack key={checkin.id} jc="space-between" ai="center">
            <XStack ai="center">
              <Avatar circular size="$3">
                <Avatar.Image src={checkin.avatar ?? "https://test"} />
                <Avatar.Fallback bc="orange" />
              </Avatar>
              <Text pl="$2">{checkin.username}</Text>
            </XStack>
            <Text>{dayjs(checkin.created_at).format("YYYY-MM-DD HH:mm")}</Text>
          </XStack>
        );
      });
    }
  }

  return (
    <YStack space="$3">
      <H5>Recent check-ins</H5>
      {checkinListMain}
    </YStack>
  );
}
