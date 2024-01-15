import { create } from "zustand";
import { Database, Tables } from "../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface CourtState {
  courts: Tables<"court">[];
  fetchCourts: (
    supabase: SupabaseClient<any, "public", any> | null
  ) => Promise<void>;
  addCourt: (
    props: Pick<
      Tables<"court">,
      "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
    > & {
      user_id: string;
      supabase: SupabaseClient<any, "public", any> | null;
    }
  ) => Promise<void>;
}

export const useCourtStore = create<CourtState>((set, get) => ({
  courts: [],
  fetchCourts: async (
    supabase: SupabaseClient<Database, "public", any> | null
  ) => {
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
    Tables<"court">,
    "indoor_outdoor" | "latitude" | "longitude" | "name" | "number_of_hoops"
  > & {
    user_id: string;
    supabase: SupabaseClient<Database, "public", any> | null;
  }) => {
    const res = await supabase?.from("court").insert({
      created_user_id: user_id,
      indoor_outdoor,
      latitude,
      longitude,
      name,
      number_of_hoops,
      updated_at: new Date().toISOString(),
    });

    await get().fetchCourts(supabase);
  },
}));
