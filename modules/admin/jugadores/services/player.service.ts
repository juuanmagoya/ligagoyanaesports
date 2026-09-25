import { createClient } from "@/lib/supabase/server";

import type { Player, PlayerFormData } from "../types/player";

export async function getPlayers(): Promise<Player[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("team_id", { ascending: true })
    .order("steam_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPlayerById(id: string): Promise<Player | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}

export async function createPlayer(
  playerData: PlayerFormData
): Promise<Player> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .insert({
      steam_name: playerData.steam_name,
      team_id: playerData.team_id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatePlayer(
  id: string,
  playerData: PlayerFormData
): Promise<Player> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .update({
      steam_name: playerData.steam_name,
      team_id: playerData.team_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePlayer(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}