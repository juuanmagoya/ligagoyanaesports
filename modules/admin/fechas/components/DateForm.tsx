"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    createDateAction,
    updateDateAction,
} from "@/modules/admin/fechas/actions/dates.actions";

import type { Date as LeagueDate } from "@/modules/admin/fechas/types/dates.types";

interface DateFormProps {
    date?: LeagueDate | null;
}

export function DateForm({
    date,
}: DateFormProps) {
    const router = useRouter();

    const isEditing = Boolean(date);

    const [name, setName] = useState(
        date?.name ?? ""
    );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();

        formData.append("name", name);

        try {
            const result = isEditing
                ? await updateDateAction(
                      date!.id,
                      formData
                  )
                : await createDateAction(formData);

            if (!result.success) {
                setError(
                    result.error ??
                        "Ocurrió un error al guardar la fecha."
                );

                return;
            }

            if (isEditing) {
                toast.success(
                    "Fecha actualizada correctamente."
                );
            } else {
                toast.success(
                    "Fecha creada correctamente."
                );
            }

            router.refresh();
        } catch {
            const errorMessage = isEditing
                ? "No se pudo actualizar la fecha."
                : "No se pudo crear la fecha.";

            setError(errorMessage);

            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-zinc-200"
                >
                    Nombre de la fecha
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Ej: Fecha 1"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={
                    isSubmitting ||
                    name.trim().length === 0
                }
                className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Guardando..."
                    : isEditing
                      ? "Guardar cambios"
                      : "Crear fecha"}
            </button>
        </form>
    );
}