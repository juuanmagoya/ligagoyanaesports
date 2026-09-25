"use client";

import { useState } from "react";

import { PublicTeamCard } from "./PublicTeamCard";
import { TeamRosterModal } from "./TeamRosterModal";

import type { PublicTeam } from "../types/public-team";

interface PublicTeamsProps {
    teams: PublicTeam[];
}

export function PublicTeams({
    teams,
}: PublicTeamsProps) {
    const [selectedTeam, setSelectedTeam] =
        useState<PublicTeam | null>(null);

    function handleCloseModal() {
        setSelectedTeam(null);
    }

    return (
        <>
            {teams.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-16 text-center">
                    <p className="text-sm text-zinc-500">
                        Todavía no hay equipos registrados.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {teams.map((team) => (
                        <PublicTeamCard
                            key={team.id}
                            team={team}
                            onClick={() =>
                                setSelectedTeam(team)
                            }
                        />
                    ))}
                </div>
            )}

            <TeamRosterModal
                team={selectedTeam}
                onClose={handleCloseModal}
            />
        </>
    );
}