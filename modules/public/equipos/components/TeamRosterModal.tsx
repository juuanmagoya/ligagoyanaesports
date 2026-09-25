"use client";

import Image from "next/image";
import { X, Users } from "lucide-react";

import type { PublicTeam } from "../types/public-team";

interface TeamRosterModalProps {
    team: PublicTeam | null;
    onClose: () => void;
}

export function TeamRosterModal({
    team,
    onClose,
}: TeamRosterModalProps) {
    if (!team) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                            {team.logo_url ? (
                                <Image
                                    src={team.logo_url}
                                    alt={`Logo de ${team.name}`}
                                    fill
                                    sizes="56px"
                                    className="object-contain p-2"
                                />
                            ) : (
                                <span className="text-xl font-bold text-zinc-500">
                                    {team.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {team.name}
                            </h2>

                            <p className="mt-0.5 text-sm text-zinc-500">
                                Roster · {team.players.length} jugadores
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                        aria-label="Cerrar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-400" />

                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                            Jugadores
                        </h3>
                    </div>

                    <div className="space-y-2">
                        {team.players.length === 0 ? (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-8 text-center">
                                <p className="text-sm text-zinc-500">
                                    Este equipo todavía no tiene
                                    jugadores registrados.
                                </p>
                            </div>
                        ) : (
                            team.players.map((player, index) => (
                                <div
                                    key={player.id}
                                    className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-bold text-amber-400">
                                        {index + 1}
                                    </div>

                                    <span className="font-medium text-zinc-200">
                                        {player.steam_name}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}