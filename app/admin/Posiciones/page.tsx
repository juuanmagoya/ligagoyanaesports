import { PositionForm } from "@/modules/admin/posiciones/components/positionForm";
import { PositionTable } from "@/modules/admin/posiciones/components/positionTable"

import {
    getPositionById,
    getPositions,
} from "@/modules/admin/posiciones/services/positions.service";

import { getTeams } from "@/modules/admin/equipos/services/team.service";

interface PositionsPageProps {
    searchParams: Promise<{
        edit?: string;
    }>;
}

export default async function PositionsPage({
    searchParams,
}: PositionsPageProps) {
    const params = await searchParams;

    const [positions, teams] = await Promise.all([
        getPositions(),
        getTeams(),
    ]);

    const editingPosition = params.edit
        ? await getPositionById(params.edit)
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Posiciones
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Gestioná la tabla de posiciones de la
                    liga.
                </p>
            </div>

            <PositionForm
                key={editingPosition?.id ?? "new"}
                position={editingPosition}
                teams={teams}
            />

            <PositionTable
                positions={positions}
                teams={teams}
            />
        </div>
    );
}