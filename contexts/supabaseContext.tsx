import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-native-url-polyfill/auto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Database } from "../types/supabase";

type SupabaseContextType = {
  supabase: SupabaseClient<any, "public", any> | null;
  loading: boolean;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

const SupabaseProvider = ({ children }: PropsWithChildren<{}>) => {
  const [supabase, setSupabase] = useState<SupabaseClient<
    any,
    "public",
    any
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const supabaseClient = async (supabaseAccessToken: string | null) => {
      const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      });
      // set Supabase JWT on the client object,
      // so it is sent up with all Supabase requests
      return supabase;
    };

    async function setupSupabase() {
      setLoading(true);

      const supabaseAccessToken = await getToken({ template: "supabase" });

      const supabaseInstance = await supabaseClient(supabaseAccessToken);

      setSupabase(supabaseInstance);
      setLoading(false);
    }

    setupSupabase();
  }, []);

  const value = { supabase, loading };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

export { SupabaseProvider, useSupabase };
