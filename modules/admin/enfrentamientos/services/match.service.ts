import { createClient } from "@/lib/supabase/server";

import type {
    CreateMatchData,
    Match,
    UpdateMatchData,
} from "../types/matches.types";

/**
 * Obtiene todos los enfrentamientos registrados.
 *
 * Los resultados se ordenan por fecha de creación.
 */
export async function getMatches(): Promise<Match[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("created_at", {
            ascending: true,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data as Match[];
}

/**
 * Obtiene un enfrentamiento por su ID.
 *
 * Retorna null si no existe.
 */
export async function getMatchById(
    id: string
): Promise<Match | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("matches")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as Match | null;
}

/**
 * Registra un nuevo enfrentamiento.
 *
 * La operación completa se ejecuta mediante la RPC
 * `register_match`.
 *
 * La RPC:
 *
 * 1. Crea el enfrentamiento.
 * 2. Actualiza la posición del Team A.
 * 3. Actualiza la posición del Team B.
 *
 * Todas las operaciones forman parte de una única
 * transacción de PostgreSQL.
 */
export async function createMatch(
    matchData: CreateMatchData
): Promise<Match> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
        "register_match",
        {
            p_date_id: matchData.date_id,
            p_team_a_id: matchData.team_a_id,
            p_team_b_id: matchData.team_b_id,
            p_score_a: matchData.score_a,
            p_score_b: matchData.score_b,
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    return data as Match;
}

/**
 * Actualiza un enfrentamiento existente.
 *
 * La operación completa se ejecuta mediante la RPC
 * `update_match`.
 *
 * La RPC:
 *
 * 1. Obtiene el resultado anterior.
 * 2. Revierte sus efectos sobre positions.
 * 3. Actualiza el enfrentamiento.
 * 4. Aplica las nuevas estadísticas sobre positions.
 *
 * Todo se ejecuta dentro de una única transacción.
 */
export async function updateMatch(
    id: string,
    matchData: UpdateMatchData
): Promise<Match> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
        "update_match",
        {
            p_match_id: id,
            p_date_id: matchData.date_id,
            p_team_a_id: matchData.team_a_id,
            p_team_b_id: matchData.team_b_id,
            p_score_a: matchData.score_a,
            p_score_b: matchData.score_b,
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    return data as Match;
}

/**
 * Elimina un enfrentamiento existente.
 *
 * La operación completa se ejecuta mediante la RPC
 * `delete_match`.
 *
 * La RPC:
 *
 * 1. Obtiene el enfrentamiento.
 * 2. Revierte sus efectos sobre positions.
 * 3. Elimina el enfrentamiento.
 *
 * Todo se ejecuta dentro de una única transacción.
 */
export async function deleteMatch(
    id: string
): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.rpc(
        "delete_match",
        {
            p_match_id: id,
        }
    );

    if (error) {
        throw new Error(error.message);
    }
}