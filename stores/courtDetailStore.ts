import { create } from "zustand";
import { Checkin, Court, Supabase } from "../types";

interface CourtDetailState {
  courtDetail: {
    checkins: Pick<
      Checkin,
      "id" | "user_id" | "created_at" | "username" | "avatar"
    >[];
    images: string[];
  } | null;
  loadingImages: boolean;
  loadingCheckins: boolean;
  fetchCourtDetails: (
    props: Pick<Court, "id"> & { supabase: Supabase }
  ) => Promise<void>;
  updating: boolean;
  addCheckin: (
    props: Pick<Checkin, "court_id" | "username" | "avatar"> & {
      supabase: Supabase;
    }
  ) => Promise<{ error: string | null }>;
}

export const useCourtDetailStore = create<CourtDetailState>((set, get) => ({
  courtDetail: null,
  loadingImages: false,
  loadingCheckins: false,
  fetchCourtDetails: async ({
    id,
    supabase,
  }: Pick<Court, "id"> & { supabase: Supabase }) => {
    set({ loadingImages: true });
    set({ loadingCheckins: true });
    const checkinRes = await supabase
      ?.from("checkin")
      .select()
      .eq("court_id", id)
      .order("created_at", { ascending: false });
    if (checkinRes?.data) {
      set((state) => ({
        courtDetail: {
          checkins: checkinRes.data,
          images: state.courtDetail ? [...state.courtDetail.images] : [],
        },
      }));
    }
    set({ loadingCheckins: false });

    const imageListRes = await supabase?.storage
      .from("courts")
      .list(String(id), {
        limit: 1,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (imageListRes?.data && imageListRes?.data.length > 0) {
      for (const image of imageListRes?.data) {
        const imageRes = await supabase?.storage
          .from("courts")
          .download(`${id}/${image.name}`);
        if (imageRes?.data) {
          const fr = new FileReader();
          fr.readAsDataURL(imageRes.data!);
          fr.onload = () => {
            set((state) => ({
              courtDetail: {
                checkins: state.courtDetail
                  ? [...state.courtDetail.checkins]
                  : [],
                images: [fr.result as string],
              },
            }));
          };
        }
      }
    } else {
      set((state) => ({
        courtDetail: {
          checkins: state.courtDetail ? [...state.courtDetail.checkins] : [],
          images: [],
        },
      }));
    }

    set({ loadingImages: false });
  },
  updating: false,
  addCheckin: async ({
    court_id,
    username,
    avatar,
    supabase,
  }: Pick<Checkin, "court_id" | "username" | "avatar"> & {
    supabase: Supabase;
  }) => {
    set({ updating: true });
    if (!supabase) {
      set({ updating: false });
      return { error: "Supabase instance not available" };
    }
    const res = await supabase.from("checkin").insert({
      court_id,
      username,
      avatar,
    });

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    const checkinRes = await supabase
      ?.from("checkin")
      .select()
      .eq("court_id", court_id)
      .order("created_at", { ascending: false });
    if (checkinRes?.data) {
      set((state) => ({
        courtDetail: {
          checkins: checkinRes.data,
          images: state.courtDetail ? [...state.courtDetail.images] : [],
        },
      }));
    }

    set({ updating: false });
    return { error: null };
  },
}));
