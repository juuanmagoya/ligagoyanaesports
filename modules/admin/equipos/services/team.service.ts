import { createClient } from "@/lib/supabase/server";

import type {
    CreateTeamData,
    Team,
    UpdateTeamData,
} from "../types/team.types";

export async function getTeams(): Promise<Team[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as Team[];
}

export async function getTeamById(
    id: string
): Promise<Team | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as Team | null;
}

export async function createTeam(
    teamData: CreateTeamData
): Promise<Team> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("teams")
        .insert(teamData)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Team;
}

export async function updateTeam(
    id: string,
    teamData: UpdateTeamData
): Promise<Team> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("teams")
        .update(teamData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Team;
}

export async function deleteTeam(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}