"use client";

import { Pencil, Swords, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { deleteMatchAction } from "@/modules/admin/enfrentamientos/actions/matches.actions";

import type { Match } from "@/modules/admin/enfrentamientos/types/matches.types";

interface MatchTableProps {
    matches: Match[];

    dates: {
        id: string;
        name: string;
    }[];

    teams: {
        id: string;
        name: string;
    }[];
}

export function MatchTable({
    matches,
    dates,
    teams,
}: MatchTableProps) {
    const router = useRouter();

    const [matchToDelete, setMatchToDelete] =
        useState<Match | null>(null);

    const [isDeleting, setIsDeleting] =
        useState(false);

    function getDateName(dateId: string) {
        return (
            dates.find((date) => date.id === dateId)
                ?.name ?? "Fecha desconocida"
        );
    }

    function getTeamName(teamId: string) {
        return (
            teams.find((team) => team.id === teamId)
                ?.name ?? "Equipo desconocido"
        );
    }

    function handleEdit(matchId: string) {
        router.push(
            `/admin/Enfrentamientos?edit=${matchId}`
        );
    }

    async function handleDelete() {
        if (!matchToDelete) {
            return;
        }

        setIsDeleting(true);

        try {
            const result = await deleteMatchAction(
                matchToDelete.id
            );

            if (!result.success) {
                toast.error(
                    result.error ??
                        "No se pudo eliminar el enfrentamiento."
                );

                return;
            }

            toast.success(
                "Enfrentamiento eliminado correctamente."
            );

            setMatchToDelete(null);

            router.refresh();
        } catch {
            toast.error(
                "No se pudo eliminar el enfrentamiento."
            );
        } finally {
            setIsDeleting(false);
        }
    }

    if (matches.length === 0) {
        return (
            <div className="pb-8">
                <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-12 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                        <Swords className="h-6 w-6 text-amber-500" />
                    </div>

                    <h3 className="text-sm font-semibold text-white">
                        No hay enfrentamientos registrados
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-zinc-500">
                        Todavía no se registraron
                        enfrentamientos en la liga.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="pb-8">
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Fecha
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Equipo A
                                    </th>

                                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Resultado
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Equipo B
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {matches.map((match) => {
                                    const teamAName =
                                        getTeamName(
                                            match.team_a_id
                                        );

                                    const teamBName =
                                        getTeamName(
                                            match.team_b_id
                                        );

                                    const isTeamAWinner =
                                        match.score_a >
                                        match.score_b;

                                    const isTeamBWinner =
                                        match.score_b >
                                        match.score_a;

                                    return (
                                        <tr
                                            key={match.id}
                                            className="border-b border-zinc-800/70 transition hover:bg-zinc-800/30"
                                        >
                                            {/* Fecha */}
                                            <td className="px-5 py-4">
                                                <span className="inline-flex rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                                                    {getDateName(
                                                        match.date_id
                                                    )}
                                                </span>
                                            </td>

                                            {/* Equipo A */}
                                            <td className="px-5 py-4 text-right">
                                                <span
                                                    className={
                                                        isTeamAWinner
                                                            ? "font-semibold text-white"
                                                            : "text-zinc-300"
                                                    }
                                                >
                                                    {teamAName}
                                                </span>
                                            </td>

                                            {/* Resultado */}
                                            <td className="px-5 py-4 text-center">
                                                <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5">
                                                    <span
                                                        className={
                                                            isTeamAWinner
                                                                ? "font-bold text-amber-400"
                                                                : "font-semibold text-zinc-300"
                                                        }
                                                    >
                                                        {
                                                            match.score_a
                                                        }
                                                    </span>

                                                    <span className="text-zinc-600">
                                                        -
                                                    </span>

                                                    <span
                                                        className={
                                                            isTeamBWinner
                                                                ? "font-bold text-amber-400"
                                                                : "font-semibold text-zinc-300"
                                                        }
                                                    >
                                                        {
                                                            match.score_b
                                                        }
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Equipo B */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={
                                                        isTeamBWinner
                                                            ? "font-semibold text-white"
                                                            : "text-zinc-300"
                                                    }
                                                >
                                                    {teamBName}
                                                </span>
                                            </td>

                                            {/* Acciones */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                match.id
                                                            )
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                                                        title="Editar"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setMatchToDelete(
                                                                match
                                                            )
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(matchToDelete)}
                title="Eliminar enfrentamiento"
                description={
                    matchToDelete
                        ? `¿Seguro que querés eliminar el enfrentamiento entre ${getTeamName(
                              matchToDelete.team_a_id
                          )} y ${getTeamName(
                              matchToDelete.team_b_id
                          )}? Esta acción también revertirá sus estadísticas en la tabla de posiciones.`
                        : ""
                }
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                onConfirm={() => {
                    void handleDelete();
                }}
                onCancel={() => {
                    if (!isDeleting) {
                        setMatchToDelete(null);
                    }
                }}
                loading={isDeleting}
            />
        </>
    );
}