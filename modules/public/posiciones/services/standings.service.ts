// modules/public/posiciones/services/get-public-positions.ts
import { createClient } from "@/lib/supabase/server";
import type { PositionWithTeam } from "@/modules/admin/posiciones/types/positions.types";

export async function getPublicPositions(): Promise<PositionWithTeam[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("positions")
    .select(`
      *,
      team:teams (
        id,
        name,
        logo_url
      )
    `)
    .order("points", { ascending: false })
    .order("maps_won", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Normalizar valores nullable a números seguros
  const positions: PositionWithTeam[] = (data ?? []).map((row) => ({
    ...row,
    matches_played: row.matches_played ?? 0,
    matches_won: row.matches_won ?? 0,
    matches_drawn: row.matches_drawn ?? 0,
    matches_lost: row.matches_lost ?? 0,
    maps_won: row.maps_won ?? 0,
    points: row.points ?? 0,
  }));

  return positions;
}