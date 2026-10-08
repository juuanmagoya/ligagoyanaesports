export interface HomeStats {
  teams: number;
  players: number;
}

export interface HomeLastMatch {
  id: string;
  teamA: {
    id: string;
    name: string;
    logo_url: string | null;
  };
  teamB: {
    id: string;
    name: string;
    logo_url: string | null;
  };
  scoreA: number;
  scoreB: number;
}

export interface HomeStanding {
  pos: number;
  teamId: string;
  team: string;
  logo_url: string | null;
  played: number;
  wins: number;
  losses: number;
  points: number;
}

export interface HomeData {
  stats: HomeStats;
  lastMatch: HomeLastMatch | null;
  standings: HomeStanding[];
  featuredTeams: HomeFeaturedTeam[];
}

//Type para representar un equipo destacado en la página de inicio
export interface HomeFeaturedTeam {
  id: string;
  name: string;
  logo_url: string | null;
  rank: number;
  wins: number;
  losses: number;
  matchesPlayed: number;
}

