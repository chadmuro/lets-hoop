import { create } from "zustand";
import { Favorite, Supabase } from "../types";

interface FavoriteState {
  updating: boolean;
  favorites: Favorite[];
  fetchFavorites: (
    props: Pick<Favorite, "user_id"> & {
      supabase: Supabase;
    }
  ) => Promise<void>;
  addFavorite: (
    props: Pick<Favorite, "court_id" | "user_id"> & {
      supabase: Supabase;
    }
  ) => Promise<{ error: string | null }>;
  deleteFavorite: (
    props: Pick<Favorite, "id" | "user_id"> & {
      supabase: Supabase;
    }
  ) => Promise<{ error: string | null }>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  updating: false,
  favorites: [],
  fetchFavorites: async ({
    user_id,
    supabase,
  }: Pick<Favorite, "user_id"> & {
    supabase: Supabase;
  }) => {
    const res = await supabase
      ?.from("favorite")
      .select(
        `
          id,
          court_id,
          user_id,
          created_at,
          court (name)
        `
      )
      .eq("user_id", user_id);

    if (res?.data) {
      //@ts-expect-error
      set({ favorites: res.data });
    }
  },
  addFavorite: async ({
    court_id,
    user_id,
    supabase,
  }: Pick<Favorite, "court_id" | "user_id"> & {
    supabase: Supabase;
  }) => {
    set({ updating: true });
    // create favorite to update UI instantly
    set((state) => ({
      favorites: [
        ...state.favorites,
        {
          id: 99999,
          court_id,
          user_id,
          created_at: "9999-01-01",
          court: {
            name: "",
          },
        },
      ],
    }));
    if (!supabase) {
      set({ updating: false });
      return { error: "Supabase instance not available" };
    }
    const res = await supabase.from("favorite").insert({
      court_id,
    });

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    await get().fetchFavorites({ user_id, supabase });
    set({ updating: false });
    return { error: null };
  },
  deleteFavorite: async ({
    id,
    user_id,
    supabase,
  }: Pick<Favorite, "id" | "user_id"> & {
    supabase: Supabase;
  }) => {
    set({ updating: true });
    // delete favorite to update UI instantly
    set((state) => {
      const newState = state.favorites.filter((favorite) => favorite.id !== id);
      return { favorites: newState };
    });

    if (!supabase) {
      set({ updating: false });
      return { error: "Supabase instance not available" };
    }
    const res = await supabase.from("favorite").delete().eq("id", id);

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    await get().fetchFavorites({ user_id, supabase });
    set({ updating: false });
    return { error: null };
  },
}));
