import { Trophy, Crown, TrendingUp, Swords, ChevronRight, Medal, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PositionWithTeam } from "@/modules/admin/posiciones/types/positions.types";

interface PublicStandingsTableProps {
  positions: PositionWithTeam[];
  round?: string;
}

// ===== Helpers seguros =====
const safeNumber = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const calcWinrate = (played: number, won: number) =>
  played > 0 ? Math.round((won / played) * 100) : 0;

const positionBadgeStyles = (index: number) => {
  if (index === 0)
    return "bg-gradient-to-br from-amber-300 to-amber-600 text-amber-950 ring-1 ring-amber-400/50 shadow-lg shadow-amber-900/30";
  if (index === 1)
    return "bg-gradient-to-br from-zinc-200 to-zinc-500 text-zinc-900 ring-1 ring-zinc-300/40 shadow-lg shadow-zinc-900/30";
  if (index === 2)
    return "bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950 ring-1 ring-orange-400/40 shadow-lg shadow-orange-900/30";
  return "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800";
};

const winrateColor = (wr: number) =>
  wr >= 60 ? "bg-emerald-500" : wr >= 40 ? "bg-amber-500" : "bg-red-500";

// ===== Empty state =====
function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 px-6 py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 ring-1 ring-zinc-800/50">
          <Trophy className="h-7 w-7 text-zinc-600" />
        </div>

        <h3 className="text-lg font-bold text-white">
          La tabla todavía no tiene datos
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          La competencia arranca en los próximos días. Cuando se jueguen
          los primeros partidos, vas a ver acá la clasificación en vivo.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/equipos/inscripcion"
            className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
          >
            Inscribir mi equipo
            <ChevronRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/enfrentamientos"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          >
            <Swords size={14} />
            Ver fixture
          </Link>
        </div>
      </div>
    </div>
  );
}

// ===== Tabla principal =====
export default function PublicStandingsTable({
  positions,
  round = "Temporada 2026",
}: PublicStandingsTableProps) {
  if (positions.length === 0) {
    return <EmptyState />;
  }

  const total = positions.length;
  const leader = positions[0];
  const podium = positions.slice(0, 3);
  const totalMatches = positions.reduce(
    (acc, p) => acc + safeNumber(p.matches_played),
    0
  );
  const totalMaps = positions.reduce(
    (acc, p) => acc + safeNumber(p.maps_won),
    0
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ================= DESKTOP: Header + Podio + Tabla ================= */}

      {/* ===== Header grande desktop ===== */}
      <div className="hidden md:block">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Ícono trofeo grande */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-900/40 ring-1 ring-red-500/40">
              <Trophy size={28} className="text-white" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {round}
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                  {total} {total === 1 ? "equipo" : "equipos"}
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-white lg:text-3xl">
                Clasificación general
              </h2>
            </div>
          </div>

          {/* Mini stats a la derecha */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Partidos jugados
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {totalMatches}
              </p>
            </div>
            <div className="h-10 w-px bg-zinc-800" />
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Mapas jugados
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {totalMaps}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Podio top 3 ===== */}
      <div className="hidden grid-cols-3 gap-4 md:grid">
        {podium.map((position, i) => {
          const won = safeNumber(position.matches_won);
          const played = safeNumber(position.matches_played);
          const points = safeNumber(position.points);
          const wr = calcWinrate(played, won);

          const podiumStyles = [
            {
              // 1° - más alto y destacado
              wrapper:
                "md:order-2 md:scale-105 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-zinc-950 to-zinc-950 shadow-2xl shadow-amber-900/20 z-10",
              positionBadge:
                "bg-gradient-to-br from-amber-300 to-amber-600 text-amber-950 shadow-amber-900/40",
              position: "1°",
              crownColor: "text-amber-400",
              ptsColor: "text-amber-400",
              label: "Líder",
              labelColor: "text-amber-400",
            },
            {
              // 2° - izquierda
              wrapper:
                "md:order-1 border-zinc-700/60 bg-gradient-to-br from-zinc-900 to-zinc-950",
              positionBadge:
                "bg-gradient-to-br from-zinc-200 to-zinc-500 text-zinc-900 shadow-zinc-900/40",
              position: "2°",
              crownColor: "text-zinc-300",
              ptsColor: "text-zinc-100",
              label: "Segundo",
              labelColor: "text-zinc-400",
            },
            {
              // 3° - derecha
              wrapper:
                "md:order-3 border-orange-700/40 bg-gradient-to-br from-orange-950/20 to-zinc-950",
              positionBadge:
                "bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950 shadow-orange-900/40",
              position: "3°",
              crownColor: "text-orange-400",
              ptsColor: "text-orange-400",
              label: "Tercero",
              labelColor: "text-orange-400",
            },
          ][i];

          return (
            <Link
              key={position.id}
              href="#"
              className={`group relative overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-1 ${podiumStyles.wrapper}`}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/0 blur-3xl transition group-hover:bg-red-600/15" />

              <div className="relative flex items-start justify-between">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black shadow-lg ${podiumStyles.positionBadge}`}
                >
                  {podiumStyles.position}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${podiumStyles.labelColor}`}
                >
                  {i === 0 && <Flame size={10} />}
                  {podiumStyles.label}
                </span>
              </div>

              {/* Logo + nombre */}
              <div className="relative mt-5 flex items-center gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  {position.team.logo_url ? (
                    <Image
                      src={position.team.logo_url}
                      alt={position.team.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <span className="text-lg font-black text-zinc-400">
                      {position.team.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-white">
                    {position.team.name}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {won}W · {safeNumber(position.matches_lost)}L · {wr}% WR
                  </p>
                </div>

                {i === 0 && (
                  <Crown
                    size={20}
                    className={`shrink-0 ${podiumStyles.crownColor}`}
                  />
                )}
              </div>

              {/* PTS grande */}
              <div className="relative mt-5 flex items-end justify-between border-t border-zinc-800/80 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Puntos
                  </p>
                  <p
                    className={`mt-1 text-3xl font-black leading-none ${podiumStyles.ptsColor}`}
                  >
                    {points}
                  </p>
                </div>

                {/* Winrate mini bar */}
                <div className="w-24">
                  <p className="mb-1 text-right text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Winrate
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${winrateColor(wr)}`}
                      style={{ width: `${wr}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[11px] font-bold text-zinc-300">
                    {wr}%
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ===== Tabla desktop ===== */}
      <div className="hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="w-20 px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  #
                </th>
                <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Equipo
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  PJ
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  PG
                </th>
                <th className="w-20 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  PP
                </th>
                <th className="w-24 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Mapas
                </th>
                <th className="w-40 px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Winrate
                </th>
                <th className="w-28 px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
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
                    className={`group relative border-b border-zinc-800/80 transition last:border-0 ${
                      isLeader
                        ? "bg-gradient-to-r from-amber-950/25 via-zinc-950 to-zinc-950 hover:from-amber-950/40"
                        : isTop3
                        ? "hover:bg-zinc-900/60"
                        : "hover:bg-zinc-900/40"
                    }`}
                  >
                    {/* Posición */}
                    <td className="relative px-5 py-4">
                      {isLeader && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600 opacity-90" />
                      )}

                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black ${positionBadgeStyles(
                          index
                        )}`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    {/* Equipo */}
                    <td className="px-5 py-4">
                      <Link
                        href={`/equipos/${position.team.id}`}
                        className="group/team flex items-center gap-4"
                      >
                        <div
                          className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition group-hover/team:scale-105 ${
                            isLeader
                              ? "border-amber-500/40 bg-zinc-900 shadow-lg shadow-amber-900/20"
                              : isTop3
                              ? "border-zinc-700 bg-zinc-900"
                              : "border-zinc-800 bg-zinc-900/60"
                          }`}
                        >
                          {position.team.logo_url ? (
                            <Image
                              src={position.team.logo_url}
                              alt={position.team.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <span className="text-base font-black text-zinc-400">
                              {position.team.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <p className="truncate text-base font-bold text-white transition group-hover/team:text-red-400">
                            {position.team.name}
                          </p>

                          {isLeader && (
                            <Crown
                              size={18}
                              className="shrink-0 text-amber-400"
                            />
                          )}
                        </div>
                      </Link>
                    </td>

                    {/* PJ */}
                    <td className="px-4 py-4 text-center text-base font-semibold text-zinc-400">
                      {played}
                    </td>

                    {/* PG */}
                    <td className="px-4 py-4 text-center text-base font-black text-emerald-400">
                      {won}
                    </td>

                    {/* PP */}
                    <td className="px-4 py-4 text-center text-base font-black text-red-400">
                      {lost}
                    </td>

                    {/* Mapas ganados */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md bg-zinc-900 px-2 text-base font-black text-zinc-100 ring-1 ring-zinc-800">
                        {mapsWon}
                      </span>
                    </td>

                    {/* Winrate */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                          <div
                            className={`h-full rounded-full transition-all ${winrateColor(
                              winrate
                            )}`}
                            style={{ width: `${winrate}%` }}
                          />
                        </div>
                        <span className="w-11 text-right text-sm font-black text-zinc-200">
                          {winrate}%
                        </span>
                      </div>
                    </td>

                    {/* PTS */}
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex h-11 min-w-[52px] items-center justify-center rounded-xl text-lg font-black ring-1 transition ${
                          isLeader
                            ? "bg-gradient-to-br from-amber-400/20 to-amber-600/10 text-amber-300 ring-amber-400/40 shadow-lg shadow-amber-900/20"
                            : isTop3
                            ? "bg-zinc-900 text-amber-400 ring-zinc-700"
                            : "bg-zinc-900 text-amber-400 ring-zinc-800"
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

      {/* ===== Cards mobile (SIN CAMBIOS) ===== */}
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
              className={`group relative block overflow-hidden rounded-2xl border p-4 transition ${
                isLeader
                  ? "border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-zinc-950 to-zinc-950"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}
            >
              {isLeader && (
                <span className="absolute left-0 top-0 h-full w-1 bg-amber-400 opacity-80" />
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-black ${
                    index === 0
                      ? "bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/40"
                      : index === 1
                      ? "bg-zinc-300/10 text-zinc-300 ring-1 ring-zinc-300/20"
                      : index === 2
                      ? "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/30"
                      : "text-zinc-500"
                  }`}
                >
                  {index + 1}
                </span>

                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                  {position.team.logo_url ? (
                    <Image
                      src={position.team.logo_url}
                      alt={position.team.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <span className="text-sm font-black text-zinc-400">
                      {position.team.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-white">
                    {position.team.name}
                  </p>
                  {isLeader && (
                    <Crown
                      size={14}
                      className="shrink-0 text-amber-400"
                    />
                  )}
                </div>

                <span
                  className={`inline-flex h-9 min-w-[44px] items-center justify-center rounded-lg px-2 text-sm font-black ring-1 ${
                    isLeader
                      ? "bg-amber-400/10 text-amber-400 ring-amber-400/30"
                      : "bg-zinc-900 text-amber-400 ring-zinc-800"
                  }`}
                >
                  {points}
                </span>
              </div>

              {/* Stats grid */}
              <div className="mt-3 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
                <div className="bg-zinc-950 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                    PJ
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-zinc-300">
                    {played}
                  </p>
                </div>
                <div className="bg-zinc-950 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                    PG
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-emerald-400">
                    {won}
                  </p>
                </div>
                <div className="bg-zinc-950 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                    PP
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-red-400">
                    {lost}
                  </p>
                </div>
                <div className="bg-zinc-950 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                    Mapas
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-zinc-200">
                    {mapsWon}
                  </p>
                </div>
              </div>

              {/* Winrate */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  Winrate
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${winrateColor(winrate)}`}
                    style={{ width: `${winrate}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-zinc-300">
                  {winrate}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ===== Footer de la tabla ===== */}
      <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-zinc-600">
        <TrendingUp size={10} />
        Tabla actualizada según la última jornada jugada
      </div>
    </div>
  );
}