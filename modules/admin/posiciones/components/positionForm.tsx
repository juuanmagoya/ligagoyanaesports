"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    createPositionAction,
    updatePositionAction,
} from "@/modules/admin/posiciones/actions/positions.actions";

import type {
    Position,
    PositionWithTeam,
} from "@/modules/admin/posiciones/types/positions.types";

interface PositionFormProps {
    position?: Position | PositionWithTeam | null;
    teams: {
        id: string;
        name: string;
    }[];
}

export function PositionForm({
    position,
    teams,
}: PositionFormProps) {
    const router = useRouter();

    const isEditing = Boolean(position);

    const [teamId, setTeamId] = useState(
        position?.team_id ?? ""
    );

    const [matchesPlayed, setMatchesPlayed] = useState(
        position?.matches_played?.toString() ?? "0"
    );

    const [matchesWon, setMatchesWon] = useState(
        position?.matches_won?.toString() ?? "0"
    );

    const [matchesDrawn, setMatchesDrawn] = useState(
        position?.matches_drawn?.toString() ?? "0"
    );

    const [matchesLost, setMatchesLost] = useState(
        position?.matches_lost?.toString() ?? "0"
    );

    const [mapsWon, setMapsWon] = useState(
        position?.maps_won?.toString() ?? "0"
    );

    const [points, setPoints] = useState(
        position?.points?.toString() ?? "0"
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

        formData.append("team_id", teamId);
        formData.append(
            "matches_played",
            matchesPlayed
        );
        formData.append("matches_won", matchesWon);
        formData.append("matches_drawn", matchesDrawn);
        formData.append("matches_lost", matchesLost);
        formData.append("maps_won", mapsWon);
        formData.append("points", points);

        try {
            const result = isEditing
                ? await updatePositionAction(
                      position!.id,
                      formData
                  )
                : await createPositionAction(formData);

            if (!result.success) {
                setError(
                    result.error ??
                        "Ocurrió un error al guardar la posición."
                );

                return;
            }

            if (isEditing) {
                toast.success(
                    "Posición actualizada correctamente."
                );
            } else {
                toast.success(
                    "Posición creada correctamente."
                );
            }

            router.refresh();
        } catch {
            const errorMessage = isEditing
                ? "No se pudo actualizar la posición."
                : "No se pudo crear la posición.";

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
                    htmlFor="team_id"
                    className="mb-2 block text-sm font-medium text-zinc-200"
                >
                    Equipo
                </label>

                <select
                    id="team_id"
                    name="team_id"
                    value={teamId}
                    onChange={(event) =>
                        setTeamId(event.target.value)
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

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="matches_played"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Partidos jugados
                    </label>

                    <input
                        id="matches_played"
                        type="number"
                        min="0"
                        value={matchesPlayed}
                        onChange={(event) =>
                            setMatchesPlayed(
                                event.target.value
                            )
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="matches_won"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Partidos ganados
                    </label>

                    <input
                        id="matches_won"
                        type="number"
                        min="0"
                        value={matchesWon}
                        onChange={(event) =>
                            setMatchesWon(
                                event.target.value
                            )
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="matches_drawn"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Partidos empatados
                    </label>

                    <input
                        id="matches_drawn"
                        type="number"
                        min="0"
                        value={matchesDrawn}
                        onChange={(event) =>
                            setMatchesDrawn(
                                event.target.value
                            )
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="matches_lost"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Partidos perdidos
                    </label>

                    <input
                        id="matches_lost"
                        type="number"
                        min="0"
                        value={matchesLost}
                        onChange={(event) =>
                            setMatchesLost(
                                event.target.value
                            )
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="maps_won"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Mapas ganados
                    </label>

                    <input
                        id="maps_won"
                        type="number"
                        min="0"
                        value={mapsWon}
                        onChange={(event) =>
                            setMapsWon(
                                event.target.value
                            )
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="points"
                        className="mb-2 block text-sm font-medium text-zinc-200"
                    >
                        Puntos
                    </label>

                    <input
                        id="points"
                        type="number"
                        min="0"
                        value={points}
                        onChange={(event) =>
                            setPoints(event.target.value)
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? "Guardando..."
                    : isEditing
                      ? "Guardar cambios"
                      : "Crear posición"}
            </button>
        </form>
    );
}