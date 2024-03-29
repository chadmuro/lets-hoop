import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "./supabase";

export type Supabase = SupabaseClient<Database, "public", any> | null;

export type Court = Tables<"court">;

export type Favorite = Tables<"favorite"> & {
  court: Pick<Court, "name">;
};

export type Checkin = Tables<"checkin">;
