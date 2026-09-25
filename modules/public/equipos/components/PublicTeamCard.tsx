"use client";

import Image from "next/image";

import type { PublicTeam } from "../types/public-team";

interface PublicTeamCardProps {
    team: PublicTeam;
    onClick: () => void;
}

export function PublicTeamCard({
    team,
    onClick,
}: PublicTeamCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 text-left transition duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/20"
        >
            <div className="flex aspect-square items-center justify-center bg-zinc-950/70 p-8">
                {team.logo_url ? (
                    <div className="relative h-32 w-32 transition duration-300 group-hover:scale-105">
                        <Image
                            src={team.logo_url}
                            alt={`Logo de ${team.name}`}
                            fill
                            sizes="128px"
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                        <span className="text-3xl font-bold text-zinc-600">
                            {team.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            <div className="border-t border-zinc-800 px-5 py-4">
                <h3 className="truncate text-center text-lg font-semibold text-white transition group-hover:text-amber-400">
                    {team.name}
                </h3>

                <p className="mt-1 text-center text-xs text-zinc-500">
                    {team.players.length}{" "}
                    {team.players.length === 1
                        ? "jugador"
                        : "jugadores"}
                </p>
            </div>
        </button>
    );
}