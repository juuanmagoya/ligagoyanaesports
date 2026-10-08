import { createClient } from "@/lib/supabase/server";

import type {
  HomeData,
  HomeFeaturedTeam,
  HomeStanding,
} from "../types/home.types";

/**
 * Obtiene todos los datos necesarios para la página principal.
 *
 * Incluye:
 * - Cantidad total de equipos.
 * - Cantidad total de jugadores.
 * - Top 5 de la tabla de posiciones.
 * - Último enfrentamiento registrado.
 * - Top 5 equipos destacados.
 */
export async function getHomeData(): Promise<HomeData> {
  const supabase = await createClient();

  const [
    { count: teamsCount, error: teamsError },
    { count: playersCount, error: playersError },
    { data: positions, error: positionsError },
    { data: lastMatch, error: lastMatchError },
  ] = await Promise.all([
    // Cantidad total de equipos.
    supabase
      .from("teams")
      .select("*", {
        count: "exact",
        head: true,
      }),

    // Cantidad total de jugadores.
    supabase
      .from("players")
      .select("*", {
        count: "exact",
        head: true,
      }),

    // Posiciones ordenadas por puntos.
    //
    // Se utiliza para:
    // - Tabla resumida de posiciones.
    // - Equipos destacados.
    supabase
      .from("positions")
      .select(`
        team_id,
        matches_played,
        matches_won,
        matches_lost,
        points,
        team:teams (
          id,
          name,
          logo_url
        )
      `)
      .order("points", {
        ascending: false,
      })
      .limit(5),

    // Último enfrentamiento registrado.
    supabase
      .from("matches")
      .select(`
        id,
        team_a_id,
        team_b_id,
        score_a,
        score_b,
        teamA:teams!matches_team_a_id_fkey (
          id,
          name,
          logo_url
        ),
        teamB:teams!matches_team_b_id_fkey (
          id,
          name,
          logo_url
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle(),
  ]);

  // ============================
  // Manejo de errores
  // ============================

  if (teamsError) {
    throw new Error(teamsError.message);
  }

  if (playersError) {
    throw new Error(playersError.message);
  }

  if (positionsError) {
    throw new Error(positionsError.message);
  }

  if (lastMatchError) {
    throw new Error(lastMatchError.message);
  }

  // ============================
  // Tabla de posiciones
  // ============================

  const standings: HomeStanding[] = (positions ?? []).map(
    (position, index) => {
      const team = Array.isArray(position.team)
        ? position.team[0]
        : position.team;

      return {
        pos: index + 1,
        teamId: team?.id ?? position.team_id,
        team: team?.name ?? "Equipo",
        logo_url: team?.logo_url ?? null,
        played: position.matches_played,
        wins: position.matches_won,
        losses: position.matches_lost,
        points: position.points,
      };
    }
  );

  // ============================
  // Equipos destacados
  // ============================

  const featuredTeams: HomeFeaturedTeam[] = (positions ?? []).map(
    (position, index) => {
      const team = Array.isArray(position.team)
        ? position.team[0]
        : position.team;

      return {
        id: team?.id ?? position.team_id,
        name: team?.name ?? "Equipo",
        logo_url: team?.logo_url ?? null,
        rank: index + 1,
        wins: position.matches_won,
        losses: position.matches_lost,
        matchesPlayed: position.matches_played,
      };
    }
  );

  // ============================
  // Último enfrentamiento
  // ============================

  let formattedLastMatch: HomeData["lastMatch"] = null;

  if (lastMatch) {
    const teamA = Array.isArray(lastMatch.teamA)
      ? lastMatch.teamA[0]
      : lastMatch.teamA;

    const teamB = Array.isArray(lastMatch.teamB)
      ? lastMatch.teamB[0]
      : lastMatch.teamB;

    if (teamA && teamB) {
      formattedLastMatch = {
        id: lastMatch.id,
        teamA,
        teamB,
        scoreA: lastMatch.score_a,
        scoreB: lastMatch.score_b,
      };
    }
  }

  // ============================
  // Resultado final
  // ============================

  return {
    stats: {
      teams: teamsCount ?? 0,
      players: playersCount ?? 0,
    },

    lastMatch: formattedLastMatch,

    standings,

    featuredTeams,
  };
}