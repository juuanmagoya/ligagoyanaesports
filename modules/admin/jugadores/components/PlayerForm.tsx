"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    createPlayerAction,
    updatePlayerAction,
} from "../actions/player.actions";

import type { Player } from "../types/player";

interface Team {
    id: string;
    name: string;
}

interface PlayerFormProps {
    player?: Player | null;
    teams: Team[];
}

export function PlayerForm({
    player,
    teams,
}: PlayerFormProps) {
    const router = useRouter();

    const [steamName, setSteamName] = useState(
        player?.steam_name ?? ""
    );

    const [teamId, setTeamId] = useState(
        player?.team_id ?? ""
    );

    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(player);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("steam_name", steamName);
        formData.append("team_id", teamId);

        const result = player
            ? await updatePlayerAction(player.id, formData)
            : await createPlayerAction(formData);

        setLoading(false);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        router.push("/admin/Jugadores");
        router.refresh();
    }

    function handleCancel() {
        router.push("/admin/Jugadores");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6"
        >
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">
                    {isEditing
                        ? "Editar jugador"
                        : "Agregar jugador"}
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    {isEditing
                        ? "Modifica los datos del jugador."
                        : "Registra un nuevo jugador en la liga."}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="steam_name"
                        className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                        Nombre de Steam
                    </label>

                    <input
                        id="steam_name"
                        name="steam_name"
                        type="text"
                        value={steamName}
                        onChange={(event) =>
                            setSteamName(event.target.value)
                        }
                        placeholder="Ej: s1mple"
                        required
                        maxLength={50}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-amber-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="team_id"
                        className="mb-2 block text-sm font-medium text-zinc-300"
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
                        required
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-amber-500"
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

            <div className="mt-6 flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Guardando..."
                        : isEditing
                          ? "Guardar cambios"
                          : "Agregar jugador"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}