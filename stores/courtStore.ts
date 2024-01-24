import { create } from "zustand";
import { Database, Tables } from "../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface CourtState {
  courts: Tables<"court">[];
  posting: boolean;
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
  ) => Promise<{ error: string | null }>;
}

export const useCourtStore = create<CourtState>((set, get) => ({
  courts: [],
  posting: false,
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
