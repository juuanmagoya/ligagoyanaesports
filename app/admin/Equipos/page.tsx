import { TeamForm } from "@/modules/admin/equipos/components/team-form";
import { TeamTable } from "@/modules/admin/equipos/components/team-table";
import {
    getTeamById,
    getTeams,
} from "@/modules/admin/equipos/services/team.service";

interface TeamsPageProps {
    searchParams: Promise<{
        edit?: string;
    }>;
}

export default async function TeamsPage({
    searchParams,
}: TeamsPageProps) {
    const params = await searchParams;

    const teams = await getTeams();

    const editingTeam = params.edit
        ? await getTeamById(params.edit)
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Equipos
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Gestioná los equipos participantes de
                    la liga.
                </p>
            </div>

            <TeamForm
                key={editingTeam?.id ?? "new"}
                team={editingTeam}
            />

            <TeamTable teams={teams} />
        </div>
    );
}