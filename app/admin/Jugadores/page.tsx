import { PlayerForm } from "@/modules/admin/jugadores/components/PlayerForm";
import { PlayerTable } from "@/modules/admin/jugadores/components/PlayerTable";

import {
    getPlayerById,
    getPlayers,
} from "@/modules/admin/jugadores/services/player.service";

import { getTeams } from "@/modules/admin/equipos/services/team.service";

interface PlayersPageProps {
    searchParams: Promise<{
        edit?: string;
    }>;
}

export default async function PlayersPage({
    searchParams,
}: PlayersPageProps) {
    const params = await searchParams;

    const [players, teams] = await Promise.all([
        getPlayers(),
        getTeams(),
    ]);

    const editingPlayer = params.edit
        ? await getPlayerById(params.edit)
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Jugadores
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Gestioná los jugadores de los equipos de la
                    liga.
                </p>
            </div>

            <PlayerForm
                key={editingPlayer?.id ?? "new"}
                player={editingPlayer}
                teams={teams}
            />

            <PlayerTable
                players={players}
                teams={teams}
            />
        </div>
    );
}