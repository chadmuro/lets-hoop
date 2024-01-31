import { create } from "zustand";
import { decode } from "base64-arraybuffer";
import { Checkin, Court } from "../types";
import { supabaseClient } from "../supabase";

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
  fetchCheckins: (
    props: Pick<Court, "id"> & { token: string }
  ) => Promise<void>;
  fetchImages: (props: Pick<Court, "id"> & { token: string }) => Promise<void>;
  updatingCheckin: boolean;
  addCheckin: (
    props: Pick<Checkin, "court_id" | "username" | "avatar"> & {
      token: string;
    }
  ) => Promise<{ error: string | null }>;
  uploadImage: (
    props: Pick<Court, "id"> & {
      base64: string;
      filePath: string;
      token: string;
    }
  ) => Promise<void>;
}

export const useCourtDetailStore = create<CourtDetailState>((set, get) => ({
  courtDetail: null,
  loadingImages: false,
  loadingCheckins: false,
  fetchCheckins: async ({
    id,
    token,
  }: Pick<Court, "id"> & { token: string }) => {
    set({ loadingCheckins: true });
    const supabase = await supabaseClient(token);
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
    } else {
      set((state) => ({
        courtDetail: {
          checkins: [],
          images: state.courtDetail ? [...state.courtDetail.images] : [],
        },
      }));
    }
    set({ loadingCheckins: false });
  },
  fetchImages: async ({ id, token }: Pick<Court, "id"> & { token: string }) => {
    set({ loadingImages: true });
    const supabase = await supabaseClient(token);
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
  updatingCheckin: false,
  addCheckin: async ({
    court_id,
    username,
    avatar,
    token,
  }: Pick<Checkin, "court_id" | "username" | "avatar"> & {
    token: string;
  }) => {
    set({ updatingCheckin: true });
    const supabase = await supabaseClient(token);
    const res = await supabase.from("checkin").insert({
      court_id,
      username,
      avatar,
    });

    if (res.error) {
      set({ updatingCheckin: false });
      return { error: res.error.message };
    }

    await get().fetchCheckins({ id: court_id, token });

    set({ updatingCheckin: false });
    return { error: null };
  },
  uploadImage: async ({ id, base64, filePath, token }) => {
    const supabase = await supabaseClient(token);

    const res = await supabase.storage
      .from("courts")
      .upload(filePath, decode(base64), { contentType: "img/png" });
    if (!res.error) {
      await get().fetchImages({ id, token });
    }
  },
}));
