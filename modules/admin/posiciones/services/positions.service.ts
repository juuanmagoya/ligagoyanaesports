import { createClient } from "@/lib/supabase/server";

import type {
    CreatePositionData,
    Position,
    UpdatePositionData,
} from "@/modules/admin/posiciones/types/positions.types";

export async function getPositions(): Promise<Position[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("positions")
        .select("*")
        .order("points", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as Position[];
}

export async function getPositionById(
    id: string
): Promise<Position | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("positions")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as Position | null;
}

export async function getPositionByTeamId(
    teamId: string
): Promise<Position | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("positions")
        .select("*")
        .eq("team_id", teamId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as Position | null;
}

export async function createPosition(
    positionData: CreatePositionData
): Promise<Position> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("positions")
        .insert(positionData)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Position;
}

export async function updatePosition(
    id: string,
    positionData: UpdatePositionData
): Promise<Position> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("positions")
        .update(positionData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Position;
}

export async function deletePosition(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("positions")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}