import { createClient } from "@/lib/supabase/server";

import type { PublicTeam } from "../types/public-team";

export async function getPublicTeams(): Promise<PublicTeam[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("teams")
        .select(`
            id,
            name,
            logo_url,
            players (
                id,
                steam_name
            )
        `)
        .order("name", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []) as PublicTeam[];
}