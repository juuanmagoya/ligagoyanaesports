import {
  ArrowRight,
  Trophy,
  Shield,
  ChevronRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

import type { HomeFeaturedTeam } from "../home/types/home.types";
import Image from "next/image";

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
        ring: "ring-[#c2d116]/40",
        gradient: "from-[#c2d116]/30 to-[#1d1d1b]/20",
        badge: "bg-[#c2d116]/10 text-[#c2d116] ring-[#c2d116]/30",
        icon: Trophy,
        label: "Líder",
      };

    case 2:
      return {
        ring: "ring-[#f9f9f9]/30",
        gradient: "from-[#f9f9f9]/20 to-[#1d1d1b]/10",
        badge: "bg-[#f9f9f9]/10 text-[#f9f9f9]/80 ring-[#f9f9f9]/20",
        icon: Shield,
        label: "2°",
      };

    case 3:
      return {
        ring: "ring-[#c2d116]/30",
        gradient: "from-[#c2d116]/20 to-[#1d1d1b]/10",
        badge: "bg-[#c2d116]/10 text-[#c2d116] ring-[#c2d116]/20",
        icon: Shield,
        label: "3°",
      };

    default:
      return {
        ring: "ring-[#f9f9f9]/15",
        gradient: "from-[#f9f9f9]/10 to-[#1d1d1b]/10",
        badge: "bg-[#f9f9f9]/5 text-[#f9f9f9]/50 ring-[#f9f9f9]/15",
        icon: Shield,
        label: `${rank}°`,
      };
  }
};

export default function FeaturedTeams({
  teams,
}: FeaturedTeamsProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#f9f9f9]/10 bg-[#1d1d1b]">
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-[#c2d116]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f9f9f9]/10 bg-[#f9f9f9]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f9f9f9]/50">
              <Flame size={12} className="text-[#c2d116]" />
              Top 4 de la tabla
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c2d116]">
              Participantes
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#f9f9f9] sm:text-4xl">
              Equipos destacados
            </h2>

            <p className="mt-3 max-w-xl text-[#f9f9f9]/50">
              Los mejores equipos de la temporada, con su récord actual en
              la liga.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/equipos"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#c2d116] transition hover:text-[#d2e326]"
            >
              Ver todos los equipos

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/posiciones"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#f9f9f9]/45 transition hover:text-[#f9f9f9]"
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
                className="group relative overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.03] p-5 transition hover:-translate-y-1 hover:border-[#c2d116]/30 hover:bg-[#f9f9f9]/[0.06]"
              >
                {/* Glow al hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c2d116]/0 blur-3xl transition group-hover:bg-[#c2d116]/15" />

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
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br ${style.gradient} ring-2 ${style.ring} transition group-hover:scale-105`}
                  >
                    {team.logo_url ? (
                      <Image
                        src={team.logo_url}
                        alt={`Logo de ${team.name}`}
                        className="h-14 w-14 object-contain"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <span className="text-2xl font-black tracking-tight text-[#f9f9f9]">
                        {team.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Información del equipo */}
                <div className="relative mt-5 text-center">
                  <h3 className="truncate text-base font-bold text-[#f9f9f9]">
                    {team.name}
                  </h3>
                </div>

                {/* Récord */}
                <div className="relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/10">
                  <div className="bg-[#1d1d1b] px-3 py-2 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                      Récord
                    </p>

                    <p className="mt-1 text-sm font-black text-[#f9f9f9]">
                      <span className="text-[#c2d116]">
                        {team.wins}
                      </span>

                      <span className="mx-0.5 text-[#f9f9f9]/25">
                        -
                      </span>

                      <span className="text-[#f9f9f9]/50">
                        {team.losses}
                      </span>
                    </p>
                  </div>

                  <div className="bg-[#1d1d1b] px-3 py-2 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                      Winrate
                    </p>

                    <p className="mt-1 text-sm font-black text-[#f9f9f9]">
                      {wr}%
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="relative mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-[#f9f9f9]/40 transition group-hover:text-[#c2d116]">
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