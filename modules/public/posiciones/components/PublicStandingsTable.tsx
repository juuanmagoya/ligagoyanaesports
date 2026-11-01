import {
  Trophy,
  Crown,
  TrendingUp,
  Swords,
  ChevronRight,
  Flame,
  Users,
  Medal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PositionWithTeam } from "@/modules/admin/posiciones/types/positions.types";

interface PublicStandingsTableProps {
  positions: PositionWithTeam[];
  round?: string;
}

const safeNumber = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const calcWinrate = (played: number, won: number) =>
  played > 0 ? Math.round((won / played) * 100) : 0;

const positionBadgeStyles = (index: number) => {
  if (index === 0) {
    return "bg-[#c2d116] text-[#1d1d1b] shadow-md shadow-[#c2d116]/10";
  }

  if (index === 1) {
    return "bg-[#f9f9f9]/15 text-[#f9f9f9] ring-1 ring-[#f9f9f9]/15";
  }

  if (index === 2) {
    return "bg-[#a9b56f]/20 text-[#c2d116] ring-1 ring-[#c2d116]/20";
  }

  return "bg-[#f9f9f9]/5 text-[#f9f9f9]/45 ring-1 ring-[#f9f9f9]/10";
};

const winrateColor = (wr: number) =>
  wr >= 60
    ? "bg-[#c2d116]"
    : wr >= 40
      ? "bg-[#c2d116]/50"
      : "bg-[#f9f9f9]/20";

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b] px-6 py-14 text-center sm:py-16">
      <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-[#c2d116]/10 blur-3xl" />

      <div className="relative">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-[#c2d116]/20 bg-[#c2d116]/10">
          <Trophy className="size-7 text-[#c2d116]" />
        </div>

        <h3 className="text-lg font-bold text-[#f9f9f9]">
          La tabla todavía no tiene datos
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#f9f9f9]/50">
          La competencia arranca en los próximos días. Cuando se jueguen
          los primeros partidos, vas a ver acá la clasificación en vivo.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/equipos/inscripcion"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#c2d116] px-5 py-2.5 text-sm font-bold text-[#1d1d1b] transition hover:bg-[#d5e522] active:scale-[0.98]"
          >
            Inscribir mi equipo
            <ChevronRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/enfrentamientos"
            className="inline-flex items-center gap-2 rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/5 px-5 py-2.5 text-sm font-semibold text-[#f9f9f9]/75 transition hover:border-[#c2d116]/30 hover:bg-[#f9f9f9]/10 hover:text-[#f9f9f9]"
          >
            <Swords size={14} />
            Ver fixture
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PublicStandingsTable({
  positions,
  round = "Temporada 2026",
}: PublicStandingsTableProps) {
  if (positions.length === 0) {
    return <EmptyState />;
  }

  const total = positions.length;
  const totalMatches = positions.reduce(
    (acc, position) => acc + safeNumber(position.matches_played),
    0
  );
  const totalMaps = positions.reduce(
    (acc, position) => acc + safeNumber(position.maps_won),
    0
  );
  const podium = positions.slice(0, 3);

  const podiumStyles = [
    {
      wrapper:
        "md:order-2 md:scale-[1.03] border-[#c2d116]/35 bg-linear-to-br from-[#c2d116]/10 via-[#1d1d1b] to-[#1d1d1b] shadow-lg shadow-black/20 z-10",
      positionBadge: "bg-[#c2d116] text-[#1d1d1b]",
      position: "1°",
      crownColor: "text-[#c2d116]",
      ptsColor: "text-[#c2d116]",
      label: "Líder",
      labelColor: "text-[#c2d116]",
    },
    {
      wrapper:
        "md:order-1 border-[#f9f9f9]/10 bg-linear-to-br from-[#f9f9f9]/[0.06] to-[#1d1d1b]",
      positionBadge: "bg-[#f9f9f9]/15 text-[#f9f9f9]",
      position: "2°",
      crownColor: "text-[#f9f9f9]/60",
      ptsColor: "text-[#f9f9f9]",
      label: "Segundo",
      labelColor: "text-[#f9f9f9]/50",
    },
    {
      wrapper:
        "md:order-3 border-[#c2d116]/15 bg-linear-to-br from-[#c2d116]/[0.04] to-[#1d1d1b]",
      positionBadge: "bg-[#a9b56f]/20 text-[#c2d116]",
      position: "3°",
      crownColor: "text-[#a9b56f]",
      ptsColor: "text-[#c2d116]/80",
      label: "Tercero",
      labelColor: "text-[#c2d116]/70",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Encabezado de escritorio */}
      <div className="hidden md:block">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#c2d116] text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10">
              <Trophy size={25} />
              <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#1d1d1b] bg-[#f9f9f9]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c2d116]/20 bg-[#c2d116]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c2d116]">
                  <span className="size-1.5 rounded-full bg-[#c2d116]" />
                  {round}
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f9f9f9]/40">
                  {total} {total === 1 ? "equipo" : "equipos"}
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#f9f9f9] lg:text-3xl">
                Clasificación general
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                Partidos jugados
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums text-[#f9f9f9]">
                {totalMatches}
              </p>
            </div>

            <div className="h-10 w-px bg-[#f9f9f9]/10" />

            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                Mapas ganados
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums text-[#c2d116]">
                {totalMaps}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Podio de los tres primeros */}
      {podium.length > 0 && (
        <div className="hidden grid-cols-3 gap-4 md:grid">
          {podium.map((position, index) => {
            const won = safeNumber(position.matches_won);
            const played = safeNumber(position.matches_played);
            const points = safeNumber(position.points);
            const wr = calcWinrate(played, won);
            const style = podiumStyles[index];

            return (
              <div
                key={position.id}
                className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 ${style.wrapper}`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#c2d116]/0 blur-3xl transition group-hover:bg-[#c2d116]/10" />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`flex size-9 items-center justify-center rounded-lg text-sm font-black ${style.positionBadge}`}
                  >
                    {style.position}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${style.labelColor}`}
                  >
                    {index === 0 && <Flame size={11} />}
                    {style.label}
                  </span>
                </div>

                <div className="relative mt-5 flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/5">
                    {position.team.logo_url ? (
                      <Image
                        src={position.team.logo_url}
                        alt={position.team.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    ) : (
                      <span className="text-lg font-black text-[#c2d116]">
                        {position.team.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-[#f9f9f9]">
                      {position.team.name}
                    </p>
                    <p className="mt-1 text-xs text-[#f9f9f9]/45">
                      {won} PG · {safeNumber(position.matches_lost)} PP · {wr}% WR
                    </p>
                  </div>

                  {index === 0 && (
                    <Crown
                      size={19}
                      className={`shrink-0 ${style.crownColor}`}
                    />
                  )}
                </div>

                <div className="relative mt-5 flex items-end justify-between border-t border-[#f9f9f9]/10 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                      Puntos
                    </p>
                    <p
                      className={`mt-1 text-3xl font-black leading-none tabular-nums ${style.ptsColor}`}
                    >
                      {points}
                    </p>
                  </div>

                  <div className="w-24">
                    <p className="mb-1 text-right text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                      Winrate
                    </p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f9f9f9]/10">
                      <div
                        className={`h-full rounded-full ${winrateColor(wr)}`}
                        style={{ width: `${wr}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-[11px] font-bold text-[#f9f9f9]/75">
                      {wr}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabla de escritorio */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b] shadow-xl shadow-black/20 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.035]">
                <th className="w-20 px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  #
                </th>
                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  Equipo
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  PJ
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  PG
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  PP
                </th>
                <th className="w-24 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  Mapas
                </th>
                <th className="w-40 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  Winrate
                </th>
                <th className="w-28 px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  PTS
                </th>
              </tr>
            </thead>

            <tbody>
              {positions.map((position, index) => {
                const isLeader = index === 0;
                const isTop3 = index < 3;

                const played = safeNumber(position.matches_played);
                const won = safeNumber(position.matches_won);
                const lost = safeNumber(position.matches_lost);
                const mapsWon = safeNumber(position.maps_won);
                const points = safeNumber(position.points);
                const winrate = calcWinrate(played, won);

                return (
                  <tr
                    key={position.id}
                    className={`border-b border-[#f9f9f9]/[0.06] transition last:border-0 ${
                      isLeader
                        ? "bg-[#c2d116]/[0.045] hover:bg-[#c2d116]/[0.08]"
                        : "hover:bg-[#f9f9f9]/[0.025]"
                    }`}
                  >
                    <td className="relative px-5 py-4">
                      {isLeader && (
                        <span className="absolute inset-y-0 left-0 w-1 bg-[#c2d116]" />
                      )}

                      <span
                        className={`flex size-9 items-center justify-center rounded-lg text-sm font-black ${positionBadgeStyles(index)}`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/equipos/${position.team.id}`}
                        className="group/team flex items-center gap-3"
                      >
                        <div
                          className={`relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition group-hover/team:border-[#c2d116]/40 ${
                            isLeader
                              ? "border-[#c2d116]/30 bg-[#c2d116]/[0.05]"
                              : "border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.03]"
                          }`}
                        >
                          {position.team.logo_url ? (
                            <Image
                              src={position.team.logo_url}
                              alt={position.team.name}
                              fill
                              className="object-contain p-1"
                              sizes="44px"
                            />
                          ) : (
                            <span className="text-base font-black text-[#c2d116]">
                              {position.team.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <p className="truncate text-sm font-bold text-[#f9f9f9] transition group-hover/team:text-[#c2d116]">
                            {position.team.name}
                          </p>

                          {isLeader && (
                            <Crown
                              size={16}
                              className="shrink-0 text-[#c2d116]"
                            />
                          )}
                        </div>
                      </Link>
                    </td>

                    <td className="px-4 py-4 text-center text-sm font-semibold tabular-nums text-[#f9f9f9]/55">
                      {played}
                    </td>

                    <td className="px-4 py-4 text-center text-sm font-bold tabular-nums text-[#c2d116]">
                      {won}
                    </td>

                    <td className="px-4 py-4 text-center text-sm font-bold tabular-nums text-[#f9f9f9]/40">
                      {lost}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex h-8 min-w-10 items-center justify-center rounded-md border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04] px-2 text-sm font-bold tabular-nums text-[#f9f9f9]/80">
                        {mapsWon}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f9f9f9]/10">
                          <div
                            className={`h-full rounded-full transition-all ${winrateColor(winrate)}`}
                            style={{ width: `${winrate}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-xs font-bold tabular-nums text-[#f9f9f9]/75">
                          {winrate}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex h-10 min-w-12 items-center justify-center rounded-lg px-2 text-base font-black tabular-nums ring-1 ${
                          isLeader
                            ? "bg-[#c2d116] text-[#1d1d1b] ring-[#c2d116]"
                            : isTop3
                              ? "bg-[#c2d116]/10 text-[#c2d116] ring-[#c2d116]/20"
                              : "bg-[#f9f9f9]/[0.04] text-[#f9f9f9]/75 ring-[#f9f9f9]/10"
                        }`}
                      >
                        {points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas para móvil */}
      <div className="space-y-3 md:hidden">
        {positions.map((position, index) => {
          const isLeader = index === 0;

          const played = safeNumber(position.matches_played);
          const won = safeNumber(position.matches_won);
          const lost = safeNumber(position.matches_lost);
          const mapsWon = safeNumber(position.maps_won);
          const points = safeNumber(position.points);
          const winrate = calcWinrate(played, won);

          return (
            <Link
              key={position.id}
              href={`/equipos/${position.team.id}`}
              className={`group relative block overflow-hidden rounded-xl border p-3.5 transition ${
                isLeader
                  ? "border-[#c2d116]/30 bg-[#c2d116]/[0.05]"
                  : "border-[#f9f9f9]/10 bg-[#1d1d1b] hover:border-[#c2d116]/20"
              }`}
            >
              {isLeader && (
                <span className="absolute inset-y-0 left-0 w-1 bg-[#c2d116]" />
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${positionBadgeStyles(index)}`}
                >
                  {index + 1}
                </span>

                <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04]">
                  {position.team.logo_url ? (
                    <Image
                      src={position.team.logo_url}
                      alt={position.team.name}
                      fill
                      className="object-contain p-1"
                      sizes="40px"
                    />
                  ) : (
                    <span className="text-sm font-black text-[#c2d116]">
                      {position.team.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <p className="truncate text-sm font-bold text-[#f9f9f9]">
                    {position.team.name}
                  </p>

                  {isLeader && (
                    <Crown
                      size={14}
                      className="shrink-0 text-[#c2d116]"
                    />
                  )}
                </div>

                <span
                  className={`inline-flex h-9 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-black tabular-nums ring-1 ${
                    isLeader
                      ? "bg-[#c2d116] text-[#1d1d1b] ring-[#c2d116]"
                      : "bg-[#c2d116]/10 text-[#c2d116] ring-[#c2d116]/20"
                  }`}
                >
                  {points}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/10">
                <div className="bg-[#1d1d1b] px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                    PJ
                  </p>
                  <p className="mt-0.5 text-xs font-bold tabular-nums text-[#f9f9f9]/80">
                    {played}
                  </p>
                </div>

                <div className="bg-[#1d1d1b] px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                    PG
                  </p>
                  <p className="mt-0.5 text-xs font-bold tabular-nums text-[#c2d116]">
                    {won}
                  </p>
                </div>

                <div className="bg-[#1d1d1b] px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                    PP
                  </p>
                  <p className="mt-0.5 text-xs font-bold tabular-nums text-[#f9f9f9]/50">
                    {lost}
                  </p>
                </div>

                <div className="bg-[#1d1d1b] px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                    Mapas
                  </p>
                  <p className="mt-0.5 text-xs font-bold tabular-nums text-[#f9f9f9]/80">
                    {mapsWon}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/40">
                  Winrate
                </span>

                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#f9f9f9]/10">
                  <div
                    className={`h-full rounded-full ${winrateColor(winrate)}`}
                    style={{ width: `${winrate}%` }}
                  />
                </div>

                <span className="text-xs font-bold tabular-nums text-[#f9f9f9]/75">
                  {winrate}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-[#f9f9f9]/35">
        <TrendingUp size={12} className="text-[#c2d116]/70" />
        Tabla actualizada según la última jornada jugada
      </div>
    </div>
  );
}