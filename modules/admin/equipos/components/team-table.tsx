"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Pencil,
    Trash2,
    Users,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { deleteTeamAction } from "../actions/team.actions";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import type { Team } from "../types/team.types";

interface TeamTableProps {
    teams: Team[];
}

export function TeamTable({
    teams,
}: TeamTableProps) {
    const router = useRouter();

    const [teamToDelete, setTeamToDelete] =
        useState<Team | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    function handleEdit(teamId: string) {
        router.push(
            `/admin/Equipos?edit=${teamId}`
        );
    }

    function handleDeleteClick(team: Team) {
        setTeamToDelete(team);
    }

    function handleCancelDelete() {
        if (deleting) {
            return;
        }

        setTeamToDelete(null);
    }

    async function handleConfirmDelete() {
        if (!teamToDelete) {
            return;
        }

        setDeleting(true);

        const result = await deleteTeamAction(
            teamToDelete.id
        );

        if (!result.success) {
            toast.error(
                result.error ??
                    "No se pudo eliminar el equipo."
            );

            setDeleting(false);

            return;
        }

        toast.success(
            "Equipo eliminado correctamente."
        );

        setDeleting(false);
        setTeamToDelete(null);

        router.refresh();
    }

    if (teams.length === 0) {
        return (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                        <Users className="h-6 w-6 text-zinc-600" />
                    </div>

                    <h3 className="text-sm font-semibold text-zinc-200">
                        No hay equipos registrados
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-zinc-500">
                        Los equipos que registres aparecerán
                        en esta sección.
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
                                Equipos registrados
                            </h2>

                            <p className="mt-1 text-xs text-zinc-500">
                                {teams.length}{" "}
                                {teams.length === 1
                                    ? "equipo registrado"
                                    : "equipos registrados"}
                            </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                            <span className="text-xs font-medium text-zinc-400">
                                {teams.length}
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
                                    Equipo
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Fecha de registro
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {teams.map((team) => (
                                <tr
                                    key={team.id}
                                    className="group border-b border-zinc-800/80 transition last:border-0 hover:bg-zinc-900/50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                                                {team.logo_url ? (
                                                    <Image
                                                        src={
                                                            team.logo_url
                                                        }
                                                        alt={`Logo de ${team.name}`}
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-bold text-zinc-500">
                                                        {team.name
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-zinc-100">
                                                    {team.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-zinc-600">
                                                    Equipo participante
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-zinc-500">
                                        {new Date(
                                            team.created_at
                                        ).toLocaleDateString(
                                            "es-AR",
                                            {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            }
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(
                                                        team.id
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
                                                        team
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={Boolean(teamToDelete)}
                title="Eliminar equipo"
                description={
                    teamToDelete
                        ? `¿Estás seguro de que querés eliminar "${teamToDelete.name}"? También se eliminará el logo asociado al equipo. Esta acción no se puede deshacer.`
                        : ""
                }
                confirmLabel="Eliminar equipo"
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