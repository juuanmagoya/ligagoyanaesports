import Image from "next/image";
import Link from "next/link";
import { Crown, Swords } from "lucide-react";

import type { PublicMatch } from "../types/matches.types";

interface MatchCardProps {
  match: PublicMatch;
}

// Bloque de equipo
function TeamBlock({
  team,
  isWinner,
}: {
  team: { name: string; logo_url: string | null };
  isWinner: boolean;
  side: "left" | "right";
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Avatar con anillo si ganó */}
      <div
        className={`relative size-16 overflow-hidden rounded-2xl border bg-[#1d1d1b] transition ${
          isWinner
            ? "border-[#c2d116]/60 shadow-lg shadow-[#c2d116]/10"
            : "border-[#f9f9f9]/10 opacity-70"
        }`}
      >
        {team.logo_url ? (
          <Image
            src={team.logo_url}
            alt={team.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xl font-black text-[#f9f9f9]/40">
            {team.name.charAt(0).toUpperCase()}
          </div>
        )}

        {isWinner && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#c2d116] ring-2 ring-[#1d1d1b]">
            <Crown size={10} className="text-[#1d1d1b]" />
          </span>
        )}
      </div>

      <span
        className={`line-clamp-2 text-sm font-bold transition ${
          isWinner ? "text-[#f9f9f9]" : "text-[#f9f9f9]/50"
        }`}
      >
        {team.name}
      </span>
    </div>
  );
}

export default function MatchCard({ match }: MatchCardProps) {
  const scoreA = match.score_a ?? 0;
  const scoreB = match.score_b ?? 0;

  const aWon = scoreA > scoreB;
  const bWon = scoreB > scoreA;
  const isDraw = scoreA === scoreB;

  return (
    <Link
      href="#"
      className="group relative block overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-linear-to-b from-[#242421] to-[#1d1d1b] p-5 transition hover:-translate-y-0.5 hover:border-[#c2d116]/40 hover:shadow-xl hover:shadow-black/20"
    >
      {/* Brillo al pasar el cursor */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#c2d116]/0 blur-3xl transition group-hover:bg-[#c2d116]/10" />

      {/* Encabezado */}
      <div className="relative mb-5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#c2d116]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c2d116] ring-1 ring-[#c2d116]/20">
          <span className="size-1 rounded-full bg-[#c2d116]" />
          {match.date.name}
        </span>

        <span className="inline-flex items-center gap-1 rounded-md bg-[#f9f9f9]/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f9f9f9]/40">
          <Swords size={10} />
          Finalizado
        </span>
      </div>

      {/* Equipos y resultado */}
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        <TeamBlock
          team={match.team_a}
          isWinner={aWon}
          side="left"
        />

        {/* Marcador central */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={`text-3xl font-black tabular-nums transition sm:text-4xl ${
                aWon
                  ? "text-[#c2d116]"
                  : bWon
                    ? "text-[#f9f9f9]/25"
                    : "text-[#f9f9f9]"
              }`}
            >
              {scoreA}
            </span>

            <span className="text-sm font-bold text-[#f9f9f9]/20">·</span>

            <span
              className={`text-3xl font-black tabular-nums transition sm:text-4xl ${
                bWon
                  ? "text-[#c2d116]"
                  : aWon
                    ? "text-[#f9f9f9]/25"
                    : "text-[#f9f9f9]"
              }`}
            >
              {scoreB}
            </span>
          </div>

          {/* Ganador o empate */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
            {isDraw ? (
              <span className="text-[#f9f9f9]/50">Empate</span>
            ) : (
              <>
                <span className="text-[#f9f9f9]/40">Ganador</span>
                <span className="max-w-28 truncate text-[#c2d116]">
                  {aWon ? match.team_a.name : match.team_b.name}
                </span>
              </>
            )}
          </div>
        </div>

        <TeamBlock
          team={match.team_b}
          isWinner={bWon}
          side="right"
        />
      </div>
    </Link>
  );
}