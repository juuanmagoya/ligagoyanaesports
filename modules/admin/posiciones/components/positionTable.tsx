"use client";

import {
    Pencil,
    Trophy,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { deletePositionAction } from "@/modules/admin/posiciones/actions/positions.actions";

import type { Position } from "@/modules/admin/posiciones/types/positions.types";

interface PositionTableProps {
    positions: Position[];
    teams: {
        id: string;
        name: string;
    }[];
}

export function PositionTable({
    positions,
    teams,
}: PositionTableProps) {
    const router = useRouter();

    const [positionToDelete, setPositionToDelete] =
        useState<Position | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    function getTeamName(teamId: string) {
        const team = teams.find(
            (team) => team.id === teamId
        );

        return team?.name ?? "Equipo desconocido";
    }

    function handleEdit(positionId: string) {
        router.push(
            `/admin/Posiciones?edit=${positionId}`
        );
    }

    function handleDeleteClick(position: Position) {
        setPositionToDelete(position);
    }

    function handleCancelDelete() {
        if (deleting) {
            return;
        }

        setPositionToDelete(null);
    }

    async function handleConfirmDelete() {
        if (!positionToDelete) {
            return;
        }

        setDeleting(true);

        const result = await deletePositionAction(
            positionToDelete.id
        );

        if (!result.success) {
            toast.error(
                result.error ??
                    "No se pudo eliminar la posición."
            );

            setDeleting(false);

            return;
        }

        toast.success(
            "Posición eliminada correctamente."
        );

        setDeleting(false);
        setPositionToDelete(null);

        router.refresh();
    }

    if (positions.length === 0) {
        return (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                        <Trophy className="h-6 w-6 text-zinc-600" />
                    </div>

                    <h3 className="text-sm font-semibold text-zinc-200">
                        No hay posiciones registradas
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-zinc-500">
                        Las posiciones que registres
                        aparecerán en esta sección.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/10">
                {/* Header */}
                <div className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-white">
                                Tabla de posiciones
                            </h2>

                            <p className="mt-1 text-xs text-zinc-500">
                                {positions.length}{" "}
                                {positions.length === 1
                                    ? "equipo registrado"
                                    : "equipos registrados"}
                            </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                            <span className="text-xs font-medium text-zinc-400">
                                {positions.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    #
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Equipo
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    PJ
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    PG
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    PE
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    PP
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Mapas
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Puntos
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {positions.map(
                                (position, index) => (
                                    <tr
                                        key={position.id}
                                        className="group border-b border-zinc-800/80 transition last:border-0 hover:bg-zinc-900/50"
                                    >
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-sm font-bold ${
                                                    index ===
                                                    0
                                                        ? "text-amber-400"
                                                        : "text-zinc-500"
                                                }`}
                                            >
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                                                    <span className="text-sm font-bold text-zinc-400">
                                                        {getTeamName(
                                                            position.team_id
                                                        )
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-zinc-100">
                                                        {getTeamName(
                                                            position.team_id
                                                        )}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-zinc-600">
                                                        Equipo
                                                        participante
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center text-sm font-medium text-zinc-300">
                                            {
                                                position.matches_played
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-center text-sm font-medium text-emerald-400">
                                            {
                                                position.matches_won
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-center text-sm font-medium text-zinc-300">
                                            {
                                                position.matches_drawn
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-center text-sm font-medium text-red-400">
                                            {
                                                position.matches_lost
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-center text-sm font-medium text-zinc-300">
                                            {
                                                position.maps_won
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-amber-400">
                                                {
                                                    position.points
                                                }
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            position.id
                                                        )
                                                    }
                                                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-zinc-400 transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />

                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            position
                                                        )
                                                    }
                                                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />

                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(positionToDelete)}
                title="Eliminar posición"
                description={
                    positionToDelete
                        ? `¿Estás seguro de que querés eliminar la posición de "${getTeamName(
                              positionToDelete.team_id
                          )}"? Esta acción no se puede deshacer.`
                        : ""
                }
                confirmLabel="Eliminar posición"
                loading={deleting}
                onConfirm={
                    handleConfirmDelete
                }
                onCancel={
                    handleCancelDelete
                }
            />
        </>
    );
}