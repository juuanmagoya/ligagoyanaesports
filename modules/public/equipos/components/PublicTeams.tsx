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
                <div className="rounded-xl border border-[#f9f9f9]/10 bg-[#1d1d1b]/70 px-6 py-12 text-center">
                    <p className="text-sm text-[#f9f9f9]/50">
                        Todavía no hay equipos registrados.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4 2xl:grid-cols-5">
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