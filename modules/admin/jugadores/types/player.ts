export interface Player {
  id: string;
  steam_name: string;
  team_id: string;
  created_at: string;
}

export interface PlayerFormData {
  steam_name: string;
  team_id: string;
}