import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCourtStore } from "../stores/courtStore";
import { useFavoriteStore } from "../stores/favoriteStore";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { supabaseClient } from "../supabase";

export default function useInitialLoad() {
  const fetchCourts = useCourtStore((state) => state.fetchCourts);
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
  const user = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    async function initialLoad() {
      const token = await getToken({ template: "supabase" });

      if (!token) return;

      await fetchCourts(token);
      if (user.user?.id) {
        await fetchFavorites({ user_id: user.user.id, token });
      }
      SplashScreen.hideAsync();
    }

    initialLoad();
  }, []);
}
