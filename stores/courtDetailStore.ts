import { create } from "zustand";
import { Checkin, Court, Supabase } from "../types";

interface CourtDetailState {
  courtDetail: {
    checkins: Pick<
      Checkin,
      "id" | "user_id" | "created_at" | "username" | "avatar"
    >[];
  } | null;
  loading: boolean;
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
  loading: false,
  fetchCourtDetails: async ({
    id,
    supabase,
  }: Pick<Court, "id"> & { supabase: Supabase }) => {
    set({ loading: true });
    const checkinRes = await supabase
      ?.from("checkin")
      .select()
      .eq("court_id", id)
      .order("created_at", { ascending: false });
    if (checkinRes?.data) {
      set({
        courtDetail: {
          checkins: checkinRes.data,
        },
      });
    }
    set({ loading: false });
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
      set({
        courtDetail: {
          checkins: checkinRes.data,
        },
      });
    }

    set({ updating: false });
    return { error: null };
  },
}));
