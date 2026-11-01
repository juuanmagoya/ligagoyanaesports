"use client";

import Image from "next/image";
import { X, Users, Shield } from "lucide-react";

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
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <div className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b] shadow-2xl shadow-black/50">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#c2d116] to-transparent" />

                <div className="flex items-center justify-between border-b border-[#f9f9f9]/10 px-5 py-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#c2d116]/20 bg-[#f9f9f9]/5">
                            {team.logo_url ? (
                                <Image
                                    src={team.logo_url}
                                    alt={`Logo de ${team.name}`}
                                    fill
                                    sizes="48px"
                                    className="object-contain p-1.5"
                                />
                            ) : (
                                <span className="text-lg font-black text-[#c2d116]">
                                    {team.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-[#f9f9f9] sm:text-lg">
                                {team.name}
                            </h2>

                            <p className="mt-1 text-xs text-[#f9f9f9]/50">
                                Plantilla del equipo
                                <span className="mx-1.5 text-[#c2d116]/60">
                                    ·
                                </span>
                                {team.players.length} jugadores
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-3 flex size-9 shrink-0 items-center justify-center rounded-lg text-[#f9f9f9]/50 transition hover:bg-[#f9f9f9]/10 hover:text-[#c2d116]"
                        aria-label="Cerrar"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="size-4 text-[#c2d116]" />

                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#f9f9f9]/70">
                                Jugadores
                            </h3>
                        </div>

                        <span className="rounded-md border border-[#c2d116]/20 bg-[#c2d116]/10 px-2 py-1 text-xs font-semibold tabular-nums text-[#c2d116]">
                            {team.players.length}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {team.players.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#f9f9f9]/15 bg-[#f9f9f9]/[0.02] px-4 py-8 text-center">
                                <Shield className="mx-auto mb-3 size-7 text-[#f9f9f9]/20" />

                                <p className="text-sm text-[#f9f9f9]/50">
                                    Este equipo todavía no tiene
                                    jugadores registrados.
                                </p>
                            </div>
                        ) : (
                            team.players.map((player, index) => (
                                <div
                                    key={player.id}
                                    className="group flex items-center gap-3 rounded-xl border border-[#f9f9f9]/[0.07] bg-[#f9f9f9]/[0.03] px-3 py-2.5 transition hover:border-[#c2d116]/25 hover:bg-[#c2d116]/[0.05]"
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#f9f9f9]/[0.06] bg-[#f9f9f9]/[0.05] text-xs font-bold tabular-nums text-[#f9f9f9]/45 transition group-hover:border-[#c2d116]/20 group-hover:text-[#c2d116]">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <span className="min-w-0 truncate text-sm font-medium text-[#f9f9f9]/90">
                                        {player.steam_name}
                                    </span>

                                    <div className="ml-auto size-1.5 shrink-0 rounded-full bg-[#c2d116]/50 transition group-hover:bg-[#c2d116]" />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#f9f9f9]/10 bg-black/10 px-5 py-3 sm:px-6">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#f9f9f9]/30">
                        Liga Goyana de Esports
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-[#c2d116] px-4 py-2 text-xs font-bold text-[#1d1d1b] transition hover:bg-[#d5e522] active:scale-[0.98]"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}