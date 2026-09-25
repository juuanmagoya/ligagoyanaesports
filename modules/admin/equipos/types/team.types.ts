export interface Team {
    id: string;
    name: string;
    logo_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateTeamData {
    name: string;
    logo_url?: string | null;
}

export interface UpdateTeamData {
    name: string;
    logo_url?: string | null;
}