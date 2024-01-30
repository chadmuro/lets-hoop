import { create } from "zustand";
import { Court } from "../types";
import { supabaseClient } from "../supabase";

interface CourtState {
  courts: Court[];
  posting: boolean;
  fetchCourts: (token: string) => Promise<void>;
  addCourt: (
    props: Pick<
      Court,
      "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
    > & {
      token: string;
    }
  ) => Promise<{ error: string | null }>;
}

export const useCourtStore = create<CourtState>((set, get) => ({
  courts: [],
  posting: false,
  fetchCourts: async (token: string) => {
    const supabase = await supabaseClient(token);
    const res = await supabase?.from("court").select();
    if (res?.data) {
      set({ courts: res.data });
    }
  },
  addCourt: async ({
    token,
    indoor_outdoor,
    latitude,
    longitude,
    name,
    number_of_hoops,
  }: Pick<
    Court,
    "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
  > & {
    token: string;
  }) => {
    set({ posting: true });
    const supabase = await supabaseClient(token);
    const res = await supabase.from("court").insert({
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

    await get().fetchCourts(token);
    set({ posting: false });
    return { error: null };
  },
}));
