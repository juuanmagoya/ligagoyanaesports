export interface PublicTeamPlayer {
    id: string;
    steam_name: string;
}

export interface PublicTeam {
    id: string;
    name: string;
    logo_url: string | null;
    players: PublicTeamPlayer[];
}
