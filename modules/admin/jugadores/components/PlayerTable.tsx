"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePlayerAction } from "../actions/player.actions";
import type { Player } from "../types/player";

// Usá acá la misma ruta donde ya tenés tu ConfirmDialog.
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Team {
    id: string;
    name: string;
}

interface PlayerTableProps {
    players: Player[];
    teams: Team[];
}

export function PlayerTable({
    players,
    teams,
}: PlayerTableProps) {
    const router = useRouter();

    const [playerToDelete, setPlayerToDelete] =
        useState<Player | null>(null);

    const [deleting, setDeleting] = useState(false);

    const sortedPlayers = [...players].sort((a, b) => {
        const teamA =
            teams.find((team) => team.id === a.team_id)?.name ??
            "";

        const teamB =
            teams.find((team) => team.id === b.team_id)?.name ??
            "";

        const teamComparison = teamA.localeCompare(teamB);

        if (teamComparison !== 0) {
            return teamComparison;
        }

        return a.steam_name.localeCompare(b.steam_name);
    });

    async function handleDelete() {
        if (!playerToDelete) {
            return;
        }

        setDeleting(true);

        const result = await deletePlayerAction(
            playerToDelete.id
        );

        setDeleting(false);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setPlayerToDelete(null);

        router.refresh();
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-zinc-800 bg-zinc-950/60">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Jugador
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Equipo
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800">
                            {sortedPlayers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-6 py-12 text-center text-sm text-zinc-500"
                                    >
                                        No hay jugadores registrados.
                                    </td>
                                </tr>
                            ) : (
                                sortedPlayers.map((player) => {
                                    const team = teams.find(
                                        (team) =>
                                            team.id ===
                                            player.team_id
                                    );

                                    return (
                                        <tr
                                            key={player.id}
                                            className="transition hover:bg-zinc-800/40"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-white">
                                                    {player.steam_name}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm text-zinc-300">
                                                    {team?.name ??
                                                        "Equipo desconocido"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/Jugadores?edit=${player.id}`}
                                                        className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                                    >
                                                        Editar
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setPlayerToDelete(
                                                                player
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
                                                        title="Eliminar jugador"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(playerToDelete)}
                title="Eliminar jugador"
                description={
                    playerToDelete
                        ? `¿Estás seguro de que querés eliminar a "${playerToDelete.steam_name}"? Esta acción no se puede deshacer.`
                        : ""
                }
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setPlayerToDelete(null)}
            />
        </>
    );
}