"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    createMatchAction,
    updateMatchAction,
} from "@/modules/admin/enfrentamientos/actions/matches.actions";

import type {
    Match,
} from "@/modules/admin/enfrentamientos/types/matches.types";

interface MatchFormProps {
    match?: Match | null;

    dates: {
        id: string;
        name: string;
    }[];

    teams: {
        id: string;
        name: string;
    }[];
}

export function MatchForm({
    match,
    dates,
    teams,
}: MatchFormProps) {
    const router = useRouter();

    const isEditing = Boolean(match);

    const [dateId, setDateId] = useState(
        match?.date_id ?? ""
    );

    const [teamAId, setTeamAId] = useState(
        match?.team_a_id ?? ""
    );

    const [teamBId, setTeamBId] = useState(
        match?.team_b_id ?? ""
    );

    const [scoreA, setScoreA] = useState(
        match?.score_a?.toString() ?? "0"
    );

    const [scoreB, setScoreB] = useState(
        match?.score_b?.toString() ?? "0"
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

        formData.append("date_id", dateId);
        formData.append("team_a_id", teamAId);
        formData.append("team_b_id", teamBId);
        formData.append("score_a", scoreA);
        formData.append("score_b", scoreB);

        try {
            const result = isEditing
                ? await updateMatchAction(
                      match!.id,
                      formData
                  )
                : await createMatchAction(formData);

            if (!result.success) {
                setError(
                    result.error ??
                        "Ocurrió un error al guardar el enfrentamiento."
                );

                return;
            }

            if (isEditing) {
                toast.success(
                    "Enfrentamiento actualizado correctamente."
                );
            } else {
                toast.success(
                    "Enfrentamiento creado correctamente."
                );
            }

            router.refresh();
        } catch {
            const errorMessage = isEditing
                ? "No se pudo actualizar el enfrentamiento."
                : "No se pudo crear el enfrentamiento.";

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
            {/* Fecha */}
            <div>
                <label
                    htmlFor="date_id"
                    className="mb-2 block text-sm font-medium text-zinc-200"
                >
                    Fecha
                </label>

                <select
                    id="date_id"
                    name="date_id"
                    value={dateId}
                    onChange={(event) =>
                        setDateId(event.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">
                        Seleccionar fecha
                    </option>

                    {dates.map((date) => (
                        <option
                            key={date.id}
                            value={date.id}
                        >
                            {date.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Equipos */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Equipo A */}
                <div>
                    <label
                        htmlFor="team_a_id"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Equipo A
                    </label>

                    <select
                        id="team_a_id"
                        name="team_a_id"
                        value={teamAId}
                        onChange={(event) =>
                            setTeamAId(event.target.value)
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="">
                            Seleccionar equipo
                        </option>

                        {teams.map((team) => (
                            <option
                                key={team.id}
                                value={team.id}
                            >
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Equipo B */}
                <div>
                    <label
                        htmlFor="team_b_id"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Equipo B
                    </label>

                    <select
                        id="team_b_id"
                        name="team_b_id"
                        value={teamBId}
                        onChange={(event) =>
                            setTeamBId(event.target.value)
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="">
                            Seleccionar equipo
                        </option>

                        {teams.map((team) => (
                            <option
                                key={team.id}
                                value={team.id}
                            >
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Resultado */}
            <div>
                <label className="mb-3 block text-sm font-medium text-zinc-200">
                    Resultado
                </label>

                <div className="grid grid-cols-2 gap-4">
                    {/* Score A */}
                    <div>
                        <label
                            htmlFor="score_a"
                            className="mb-2 block text-xs text-zinc-400"
                        >
                            Mapas ganados — Equipo A
                        </label>

                        <input
                            id="score_a"
                            name="score_a"
                            type="number"
                            min="0"
                            step="1"
                            value={scoreA}
                            onChange={(event) =>
                                setScoreA(event.target.value)
                            }
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Score B */}
                    <div>
                        <label
                            htmlFor="score_b"
                            className="mb-2 block text-xs text-zinc-400"
                        >
                            Mapas ganados — Equipo B
                        </label>

                        <input
                            id="score_b"
                            name="score_b"
                            type="number"
                            min="0"
                            step="1"
                            value={scoreB}
                            onChange={(event) =>
                                setScoreB(event.target.value)
                            }
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Guardando..."
                    : isEditing
                      ? "Guardar cambios"
                      : "Crear enfrentamiento"}
            </button>
        </form>
    );
}