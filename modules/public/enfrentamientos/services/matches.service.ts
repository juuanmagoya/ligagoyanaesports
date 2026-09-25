import { createClient } from "@/lib/supabase/server";

import type { PublicMatch } from "../types/matches.types";

interface MatchRow {
    id: string;
    date_id: string;
    team_a_id: string;
    team_b_id: string;
    score_a: number;
    score_b: number;
}

interface DateRow {
    id: string;
    name: string;
}

interface TeamRow {
    id: string;
    name: string;
    logo_url: string | null;
}

export async function getPublicMatches(): Promise<PublicMatch[]> {
    const supabase = await createClient();

    const [
        { data: matches, error: matchesError },
        { data: dates, error: datesError },
        { data: teams, error: teamsError },
    ] = await Promise.all([
        supabase
            .from("matches")
            .select(
                "id, date_id, team_a_id, team_b_id, score_a, score_b"
            )
            .order("created_at", {
                ascending: true,
            }),

        supabase
            .from("dates")
            .select("id, name")
            .order("created_at", {
                ascending: true,
            }),

        supabase
            .from("teams")
            .select("id, name, logo_url")
            .order("name", {
                ascending: true,
            }),
    ]);

    if (matchesError) {
        throw new Error(matchesError.message);
    }

    if (datesError) {
        throw new Error(datesError.message);
    }

    if (teamsError) {
        throw new Error(teamsError.message);
    }

    const matchesData = matches as MatchRow[];
    const datesData = dates as DateRow[];
    const teamsData = teams as TeamRow[];

    const datesMap = new Map(
        datesData.map((date) => [date.id, date])
    );

    const teamsMap = new Map(
        teamsData.map((team) => [team.id, team])
    );

    return matchesData.map((match) => {
        const date = datesMap.get(match.date_id);
        const teamA = teamsMap.get(match.team_a_id);
        const teamB = teamsMap.get(match.team_b_id);

        if (!date) {
            throw new Error(
                `No se encontró la fecha del enfrentamiento ${match.id}.`
            );
        }

        if (!teamA) {
            throw new Error(
                `No se encontró el equipo A del enfrentamiento ${match.id}.`
            );
        }

        if (!teamB) {
            throw new Error(
                `No se encontró el equipo B del enfrentamiento ${match.id}.`
            );
        }

        return {
            id: match.id,
            score_a: match.score_a,
            score_b: match.score_b,

            date: {
                id: date.id,
                name: date.name,
            },

            team_a: {
                id: teamA.id,
                name: teamA.name,
                logo_url: teamA.logo_url,
            },

            team_b: {
                id: teamB.id,
                name: teamB.name,
                logo_url: teamB.logo_url,
            },
        };
    });
}