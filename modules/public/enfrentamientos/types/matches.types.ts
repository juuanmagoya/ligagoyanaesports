export interface PublicMatch {
    id: string;

    date: {
        id: string;
        name: string;
    };

    team_a: {
        id: string;
        name: string;
        logo_url: string | null;
    };

    team_b: {
        id: string;
        name: string;
        logo_url: string | null;
    };

    score_a: number;
    score_b: number;
}