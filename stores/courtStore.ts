import { create } from "zustand";
import { Court, Supabase } from "../types";

interface CourtState {
  courts: Court[];
  posting: boolean;
  fetchCourts: (supabase: Supabase) => Promise<void>;
  addCourt: (
    props: Pick<
      Court,
      "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
    > & {
      user_id: string;
      supabase: Supabase;
    }
  ) => Promise<{ error: string | null }>;
}

export const useCourtStore = create<CourtState>((set, get) => ({
  courts: [],
  posting: false,
  fetchCourts: async (supabase: Supabase) => {
    const res = await supabase?.from("court").select();
    if (res?.data) {
      set({ courts: res.data });
    }
  },
  addCourt: async ({
    supabase,
    user_id,
    indoor_outdoor,
    latitude,
    longitude,
    name,
    number_of_hoops,
  }: Pick<
    Court,
    "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
  > & {
    user_id: string;
    supabase: Supabase;
  }) => {
    set({ posting: true });
    if (!supabase) {
      set({ posting: false });
      return { error: "Supabase instance not available" };
    }
    const res = await supabase.from("court").insert({
      created_user_id: user_id,
      indoor_outdoor,
      latitude,
      longitude,
      name,
      number_of_hoops,
      updated_at: new Date().toISOString(),
    });

    if (res.error) {
      set({ posting: false });
      return { error: res.error.message };
    }

    await get().fetchCourts(supabase);
    set({ posting: false });
    return { error: null };
  },
}));
