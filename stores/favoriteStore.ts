import { create } from "zustand";
import { Favorite } from "../types";
import { supabaseClient } from "../supabase";

interface FavoriteState {
  updating: boolean;
  favorites: Favorite[];
  fetchFavorites: (
    props: Pick<Favorite, "user_id"> & {
      token: string;
    }
  ) => Promise<void>;
  addFavorite: (
    props: Pick<Favorite, "court_id" | "user_id"> & {
      token: string;
    }
  ) => Promise<{ error: string | null }>;
  deleteFavorite: (
    props: Pick<Favorite, "id" | "user_id"> & {
      token: string;
    }
  ) => Promise<{ error: string | null }>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  updating: false,
  favorites: [],
  fetchFavorites: async ({
    user_id,
    token,
  }: Pick<Favorite, "user_id"> & {
    token: string;
  }) => {
    const supabase = await supabaseClient(token);
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
    token,
  }: Pick<Favorite, "court_id" | "user_id"> & {
    token: string;
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
    const supabase = await supabaseClient(token);
    const res = await supabase.from("favorite").insert({
      court_id,
    });

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    await get().fetchFavorites({ user_id, token });
    set({ updating: false });
    return { error: null };
  },
  deleteFavorite: async ({
    id,
    user_id,
    token,
  }: Pick<Favorite, "id" | "user_id"> & {
    token: string;
  }) => {
    set({ updating: true });
    // delete favorite to update UI instantly
    set((state) => {
      const newState = state.favorites.filter((favorite) => favorite.id !== id);
      return { favorites: newState };
    });

    const supabase = await supabaseClient(token);
    const res = await supabase.from("favorite").delete().eq("id", id);

    if (res.error) {
      set({ updating: false });
      return { error: res.error.message };
    }

    await get().fetchFavorites({ user_id, token });
    set({ updating: false });
    return { error: null };
  },
}));
