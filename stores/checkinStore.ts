import { create } from "zustand";
import { Checkin, Supabase } from "../types";

interface CheckinState {
  updating: boolean;
  checkins: Checkin[];
  fetchCheckins: (supabase: Supabase) => Promise<void>;
  addCheckin: (
    props: Pick<Checkin, "court_id" | "user_id"> & {
      supabase: Supabase;
    }
  ) => Promise<{ error: string | null }>;
}

export const useCheckinStore = create<CheckinState>((set, get) => ({
  updating: false,
  checkins: [],
  fetchCheckins: async (supabase: Supabase) => {
    const res = await supabase?.from("checkin").select();
    if (res?.data) {
      set({ checkins: res.data });
    }
  },
  addCheckin: async ({
    court_id,
    user_id,
    supabase,
  }: Pick<Checkin, "court_id" | "user_id"> & {
    supabase: Supabase;
  }) => {
    set({ updating: true });
    // create Checkin to update UI instantly
    set((state) => ({
      checkins: [
        ...state.checkins,
        { id: 99999, court_id, user_id, created_at: "" },
      ],
    }));
    if (!supabase) {
      set({ updating: false });
      return { error: "Supabase instance not available" };
    }
    const res = await supabase.from("checkin").insert({
      court_id,
      user_id,
    });

    console.log(res);

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    await get().fetchCheckins(supabase);
    set({ updating: false });
    return { error: null };
  },
}));
