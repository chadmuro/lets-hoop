import { useEffect, useState } from "react";
import { useSupabase } from "../contexts/supabaseContext";

export function useCourts() {
  const { supabase, loading } = useSupabase();
  const [courts, setCourts] = useState<any[]>([]);

  useEffect(() => {
    if (supabase) {
      async function fetchData() {
        const res = await supabase?.from("court").select();
        if (res?.data) {
          setCourts(res?.data);
        }
      }
      fetchData();
    }
  }, [supabase]);

  return { courts };
}
