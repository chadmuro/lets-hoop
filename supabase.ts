import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { Database } from "./types/supabase";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

export const supabaseClient = async (supabaseToken: string) => {
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
  });

  return supabase;
};
