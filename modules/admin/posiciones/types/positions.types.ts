export interface Position {
    id: string;

    team_id: string;

    matches_played: number;

    matches_won: number;

    matches_drawn: number;

    matches_lost: number;

    maps_won: number;

    points: number;

    created_at: string;

    updated_at: string;
}

export interface CreatePositionData {
    team_id: string;

    matches_played?: number;

    matches_won?: number;

    matches_drawn?: number;

    matches_lost?: number;

    maps_won?: number;

    points?: number;
}

export interface UpdatePositionData {
    team_id?: string;

    matches_played?: number;

    matches_won?: number;

    matches_drawn?: number;

    matches_lost?: number;

    maps_won?: number;

    points?: number;
}

export interface PositionWithTeam extends Position {
    team: {
        id: string;

        name: string;

        logo_url: string | null;
    };
}