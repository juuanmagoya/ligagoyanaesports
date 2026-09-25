"use client";

import {
    CalendarDays,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { deleteDateAction } from "@/modules/admin/fechas/actions/dates.actions";

import type { Date as LeagueDate } from "@/modules/admin/fechas/types/dates.types";

interface DateTableProps {
    dates: LeagueDate[];
}

export function DateTable({
    dates,
}: DateTableProps) {
    const router = useRouter();

    const [dateToDelete, setDateToDelete] =
        useState<LeagueDate | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    function handleEdit(dateId: string) {
        router.push(
            `/admin/Fechas?edit=${dateId}`
        );
    }

    function handleDeleteClick(
        date: LeagueDate
    ) {
        setDateToDelete(date);
    }

    function handleCancelDelete() {
        if (deleting) {
            return;
        }

        setDateToDelete(null);
    }

    async function handleConfirmDelete() {
        if (!dateToDelete) {
            return;
        }

        setDeleting(true);

        const result = await deleteDateAction(
            dateToDelete.id
        );

        if (!result.success) {
            toast.error(
                result.error ??
                    "No se pudo eliminar la fecha."
            );

            setDeleting(false);

            return;
        }

        toast.success(
            "Fecha eliminada correctamente."
        );

        setDeleting(false);
        setDateToDelete(null);

        router.refresh();
    }

    if (dates.length === 0) {
        return (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                        <CalendarDays className="h-6 w-6 text-zinc-600" />
                    </div>

                    <h3 className="text-sm font-semibold text-zinc-200">
                        No hay fechas registradas
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-zinc-500">
                        Las fechas que registres
                        aparecerán en esta sección.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/10">
                <div className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-white">
                                Fechas registradas
                            </h2>

                            <p className="mt-1 text-xs text-zinc-500">
                                {dates.length}{" "}
                                {dates.length === 1
                                    ? "fecha registrada"
                                    : "fechas registradas"}
                            </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                            <span className="text-xs font-medium text-zinc-400">
                                {dates.length}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    #
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Fecha
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dates.map(
                                (date, index) => (
                                    <tr
                                        key={date.id}
                                        className="group border-b border-zinc-800/80 transition last:border-0 hover:bg-zinc-900/50"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-zinc-500">
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                                                    <CalendarDays className="h-4 w-4 text-amber-400" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-zinc-100">
                                                        {date.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-zinc-600">
                                                        Fecha de
                                                        competición
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            date.id
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
                                                            date
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
                open={Boolean(dateToDelete)}
                title="Eliminar fecha"
                description={
                    dateToDelete
                        ? `¿Estás seguro de que querés eliminar "${dateToDelete.name}"? Esta acción no se puede deshacer.`
                        : ""
                }
                confirmLabel="Eliminar fecha"
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