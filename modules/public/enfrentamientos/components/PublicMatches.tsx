"use client";

import { useMemo, useState } from "react";
import { Swords } from "lucide-react";

import DateFilter from "./DateFilter";
import MatchCard from "./MatchCard";

import type { PublicMatch } from "../types/matches.types";

interface PublicMatchesProps {
  matches: PublicMatch[];
}

export default function PublicMatches({ matches }: PublicMatchesProps) {
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);

  const dates = useMemo(() => {
    const uniqueDates = new Map<string, { id: string; name: string }>();

    matches.forEach((match) => {
      uniqueDates.set(match.date.id, match.date);
    });

    return Array.from(uniqueDates.values());
  }, [matches]);

  const countsByDate = useMemo(() => {
    const counts: Record<string, number> = {};

    matches.forEach((match) => {
      counts[match.date.id] = (counts[match.date.id] ?? 0) + 1;
    });

    return counts;
  }, [matches]);

  const filteredMatches = useMemo(() => {
    if (selectedDateId === null) return matches;

    return matches.filter((match) => match.date.id === selectedDateId);
  }, [matches, selectedDateId]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <DateFilter
        dates={dates}
        selectedDateId={selectedDateId}
        onDateChange={setSelectedDateId}
        totalCount={matches.length}
        countsByDate={countsByDate}
      />

      {/* Contador de resultados */}
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#c2d116]">
        <span className="size-1 rounded-full bg-[#c2d116]" />

        {filteredMatches.length}{" "}
        {filteredMatches.length === 1
          ? "enfrentamiento"
          : "enfrentamientos"}

        {selectedDateId !== null && (
          <span className="text-[#f9f9f9]/60">
            · {dates.find((date) => date.id === selectedDateId)?.name}
          </span>
        )}
      </div>

      {/* Lista o estado vacío */}
      {filteredMatches.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-linear-to-br from-[#1d1d1b] to-[#111110] px-6 py-14 text-center">
          <div className="pointer-events-none absolute -top-20 left-1/2 size-48 -translate-x-1/2 rounded-full bg-[#c2d116]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b]">
              <Swords className="size-6 text-[#c2d116]/60" />
            </div>

            <h3 className="text-sm font-bold text-[#f9f9f9]">
              No hay enfrentamientos para esta fecha
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-[#f9f9f9]/50">
              Probá con otra fecha o mirá todos los partidos de la liga.
            </p>

            <button
              type="button"
              onClick={() => setSelectedDateId(null)}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-[#f9f9f9]/15 bg-[#1d1d1b]/80 px-4 py-2 text-xs font-semibold text-[#f9f9f9] transition-colors hover:border-[#c2d116]/50 hover:bg-[#c2d116]/10 hover:text-[#c2d116]"
            >
              Ver todos los enfrentamientos
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}