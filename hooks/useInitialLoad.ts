import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useSupabase } from "../contexts/supabaseContext";
import { useCourtStore } from "../stores/courtStore";
import { useFavoriteStore } from "../stores/favoriteStore";
import { useUser } from "@clerk/clerk-expo";
import { useCheckinStore } from "../stores/checkinStore";

export default function useInitialLoad() {
  const { supabase } = useSupabase();
  const fetchCourts = useCourtStore((state) => state.fetchCourts);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
  const fetchCheckins = useCheckinStore((state) => state.fetchCheckins);
  const user = useUser();

  useEffect(() => {
    async function initialLoad() {
      if (supabase) {
        await fetchCourts(supabase);
        await fetchCheckins(supabase);
        if (user.user?.id) {
          await fetchFavorites({ user_id: user.user.id, supabase });
        }
        SplashScreen.hideAsync();
      }
    }

    initialLoad();
  }, [supabase]);
}
