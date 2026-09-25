export interface Match {
    id: string;
    date_id: string;
    team_a_id: string;
    team_b_id: string;
    score_a: number;
    score_b: number;
    created_at: string;
    updated_at: string;
}

export interface CreateMatchData {
    date_id: string;
    team_a_id: string;
    team_b_id: string;
    score_a: number;
    score_b: number;
}

export interface UpdateMatchData {
    date_id: string;
    team_a_id: string;
    team_b_id: string;
    score_a: number;
    score_b: number;
}