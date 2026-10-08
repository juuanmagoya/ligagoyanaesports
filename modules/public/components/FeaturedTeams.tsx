import {
  ArrowRight,
  Trophy,
  Shield,
  ChevronRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

import type { HomeFeaturedTeam } from "../home/types/home.types";

interface FeaturedTeamsProps {
  teams: HomeFeaturedTeam[];
}

// Calcula el porcentaje de victorias del equipo.
const winrate = (wins: number, matchesPlayed: number) => {
  if (matchesPlayed === 0) {
    return 0;
  }

  return Math.round((wins / matchesPlayed) * 100);
};

// Define el estilo visual de cada equipo según su posición.
const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        ring: "ring-amber-400/40",
        gradient: "from-amber-500/30 to-red-600/20",
        badge: "bg-amber-400/10 text-amber-400 ring-amber-400/30",
        icon: Trophy,
        label: "Líder",
      };

    case 2:
      return {
        ring: "ring-zinc-300/30",
        gradient: "from-zinc-400/20 to-zinc-700/10",
        badge: "bg-zinc-300/10 text-zinc-300 ring-zinc-300/20",
        icon: Shield,
        label: "2°",
      };

    case 3:
      return {
        ring: "ring-orange-500/30",
        gradient: "from-orange-500/20 to-red-700/10",
        badge: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
        icon: Shield,
        label: "3°",
      };

    default:
      return {
        ring: "ring-zinc-700/40",
        gradient: "from-zinc-700/20 to-zinc-900/10",
        badge: "bg-zinc-700/20 text-zinc-400 ring-zinc-700/40",
        icon: Shield,
        label: `${rank}°`,
      };
  }
};

export default function FeaturedTeams({
  teams,
}: FeaturedTeamsProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-red-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Flame size={12} className="text-red-500" />
              Top 4 de la tabla
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              Participantes
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Equipos destacados
            </h2>

            <p className="mt-3 max-w-xl text-zinc-500">
              Los mejores equipos de la temporada, con su récord actual en
              la liga.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/equipos"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              Ver todos los equipos

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/posiciones"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
            >
              <Trophy size={12} />
              Tabla completa
            </Link>
          </div>
        </div>

        {/* Grid de equipos */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => {
            const style = getRankStyle(team.rank);
            const BadgeIcon = style.icon;

            const wr = winrate(
              team.wins,
              team.matchesPlayed
            );

            return (
              <Link
                key={team.id}
                href="/equipos"
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                {/* Glow al hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/0 blur-3xl transition group-hover:bg-red-600/15" />

                {/* Header de card */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${style.badge}`}
                  >
                    <BadgeIcon size={10} />
                    {style.label}
                  </span>
                </div>

                {/* Logo */}
                <div className="relative mt-5">
                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${style.gradient} ring-2 ${style.ring} transition group-hover:scale-105`}
                  >
                    {team.logo_url ? (
                      <img
                        src={team.logo_url}
                        alt={`Logo de ${team.name}`}
                        className="h-14 w-14 object-contain"
                      />
                    ) : (
                      <span className="text-2xl font-black tracking-tight text-white">
                        {team.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Información del equipo */}
                <div className="relative mt-5 text-center">
                  <h3 className="truncate text-base font-bold text-white">
                    {team.name}
                  </h3>
                </div>

                {/* Récord */}
                <div className="relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
                  <div className="bg-zinc-950 px-3 py-2 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                      Récord
                    </p>

                    <p className="mt-1 text-sm font-black text-white">
                      <span className="text-emerald-400">
                        {team.wins}
                      </span>

                      <span className="mx-0.5 text-zinc-700">
                        -
                      </span>

                      <span className="text-red-400">
                        {team.losses}
                      </span>
                    </p>
                  </div>

                  <div className="bg-zinc-950 px-3 py-2 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                      Winrate
                    </p>

                    <p className="mt-1 text-sm font-black text-white">
                      {wr}%
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="relative mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-zinc-500 transition group-hover:text-red-400">
                  Ver equipo

                  <ChevronRight
                    size={12}
                    className="transition group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}