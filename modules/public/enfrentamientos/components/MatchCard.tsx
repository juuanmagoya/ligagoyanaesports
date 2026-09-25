import Image from "next/image";
import Link from "next/link";
import { Crown, ChevronRight, Swords} from "lucide-react";

import type { PublicMatch } from "../types/matches.types";

interface MatchCardProps {
  match: PublicMatch;
}

// ===== Subcomponente: bloque de equipo =====
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
        className={`relative h-16 w-16 overflow-hidden rounded-2xl border bg-zinc-950 transition ${
          isWinner
            ? "border-emerald-500/50 shadow-lg shadow-emerald-900/30"
            : "border-zinc-800 opacity-70"
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
          <div className="flex h-full w-full items-center justify-center text-xl font-black text-zinc-500">
            {team.name.charAt(0).toUpperCase()}
          </div>
        )}

        {isWinner && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-zinc-950">
            <Crown size={10} className="text-white" />
          </span>
        )}
      </div>

      <span
        className={`line-clamp-2 text-sm font-bold transition ${
          isWinner ? "text-white" : "text-zinc-400"
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
      className="group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900/60 to-zinc-950 p-5 transition hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Glow hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/0 blur-3xl transition group-hover:bg-red-600/10" />

      {/* ===== Header de card ===== */}
      <div className="relative mb-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 ring-1 ring-red-600/20">
          <span className="h-1 w-1 rounded-full bg-red-500" />
          {match.date.name}
        </span>

        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          <Swords size={10} />
          Finalizado
        </span>
      </div>

      {/* ===== Contenido: equipos + score ===== */}
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        <TeamBlock
          team={match.team_a}
          isWinner={aWon}
          side="left"
        />

        {/* Score central */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={`text-3xl font-black tabular-nums transition sm:text-4xl ${
                aWon
                  ? "text-emerald-400"
                  : bWon
                  ? "text-zinc-600"
                  : "text-white"
              }`}
            >
              {scoreA}
            </span>

            <span className="text-sm font-bold text-zinc-700">·</span>

            <span
              className={`text-3xl font-black tabular-nums transition sm:text-4xl ${
                bWon
                  ? "text-emerald-400"
                  : aWon
                  ? "text-zinc-600"
                  : "text-white"
              }`}
            >
              {scoreB}
            </span>
          </div>

          {/* Info extra: BO y mapas si existen */}
          <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            {isDraw && <span>Empate</span>}
            {!isDraw && (
              <>
                <span className="text-zinc-500">Ganador</span>
                <span className="text-emerald-400">
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