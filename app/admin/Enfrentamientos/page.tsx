import { MatchForm } from "@/modules/admin/enfrentamientos/components/MatchForm";
import { MatchTable } from "@/modules/admin/enfrentamientos/components/MatchTable";

import {
    getMatchById,
    getMatches,
} from "@/modules/admin/enfrentamientos/services/match.service";

import { getDates } from "@/modules/admin/fechas/services/date.service";
import { getTeams } from "@/modules/admin/equipos/services/team.service";

interface MatchesPageProps {
    searchParams: Promise<{
        edit?: string;
    }>;
}

export default async function MatchesPage({
    searchParams,
}: MatchesPageProps) {
    const params = await searchParams;

    const [matches, dates, teams] =
        await Promise.all([
            getMatches(),
            getDates(),
            getTeams(),
        ]);

    const editingMatch = params.edit
        ? await getMatchById(params.edit)
        : null;

    return (
        <div className="space-y-6 pb-8">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Enfrentamientos
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Gestioná los enfrentamientos y
                    resultados de la liga.
                </p>
            </div>

            <MatchForm
                key={editingMatch?.id ?? "new"}
                match={editingMatch}
                dates={dates}
                teams={teams}
            />

            <MatchTable
                matches={matches}
                dates={dates}
                teams={teams}
            />
        </div>
    );
}