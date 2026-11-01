import {
  ArrowRight,
  Trophy,
  Crown,
  ChevronRight,
  Target,
} from "lucide-react";
import Link from "next/link";

import type { HomeStanding } from "../home/types/home.types";
import Image from "next/image";

// ============================================
// Helpers
// ============================================

/**
 * Determina visualmente la zona según la posición.
 *
 * Actualmente:
 * - 1° a 3° → Playoffs
 * - 4° → Zona media
 * - 5° en adelante → Riesgo
 *
 * Esto es solamente visual. La posición real
 * viene directamente desde Supabase.
 */
const getZone = (position: number) => {
  if (position <= 3) {
    return {
      bar: "bg-[#c2d116]",
      label: "Playoffs",
      text: "text-[#c2d116]",
    };
  }

  if (position === 4) {
    return {
      bar: "bg-[#f9f9f9]",
      label: "Zona media",
      text: "text-[#f9f9f9]",
    };
  }

  return {
    bar: "bg-zinc-600",
    label: "Riesgo",
    text: "text-zinc-400",
  };
};

/**
 * Calcula el porcentaje de victorias.
 */
const getWinrate = (wins: number, played: number) => {
  if (played === 0) {
    return 0;
  }

  return Math.round((wins / played) * 100);
};

// ============================================
// Subcomponente: fila de posición
// ============================================

function StandingRow({
  team,
  index,
}: {
  team: HomeStanding;
  index: number;
}) {
  const zone = getZone(team.pos);
  const isTop3 = team.pos <= 3;

  return (
    <div
      className="group relative grid grid-cols-[36px_1fr_auto] items-center gap-3 border-t border-[#f9f9f9]/10 bg-[#1d1d1b] px-4 py-3.5 transition hover:bg-[#f9f9f9]/[0.04] sm:grid-cols-[36px_1fr_50px_50px_50px_70px] sm:gap-4"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Barra de zona */}
      <span
        className={`absolute left-0 top-0 h-full w-0.5 ${zone.bar} opacity-60`}
      />

      {/* Posición */}
      <div className="flex items-center gap-1.5 pl-1">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded text-[11px] font-black ${
            team.pos === 1
              ? "bg-[#c2d116]/10 text-[#c2d116] ring-1 ring-[#c2d116]/30"
              : team.pos === 2
                ? "bg-[#f9f9f9]/10 text-[#f9f9f9] ring-1 ring-[#f9f9f9]/20"
                : team.pos === 3
                  ? "bg-[#c2d116]/10 text-[#c2d116] ring-1 ring-[#c2d116]/30"
                  : "text-zinc-500"
          }`}
        >
          {team.pos}
        </span>
      </div>

      {/* Equipo */}
      <div className="flex min-w-0 items-center gap-2.5">
        {/* Logo */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border ${
            isTop3
              ? "border-[#c2d116]/20 bg-[#f9f9f9]/[0.04]"
              : "border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.02]"
          }`}
        >
          {team.logo_url ? (
            <Image
              src={team.logo_url}
              alt={`Logo de ${team.team}`}
              className="h-6 w-6 object-contain"
              width={24}
              height={24}
            />
          ) : (
            <span
              className={`text-xs font-black ${
                isTop3 ? "text-[#f9f9f9]" : "text-zinc-400"
              }`}
            >
              {team.team.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#f9f9f9]">
            {team.team}
          </p>

          {/* Información mobile */}
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500 sm:hidden">
            <span className="text-[#c2d116]">{team.wins}G</span>

            <span className="text-zinc-700">·</span>

            <span className="text-zinc-400">{team.losses}P</span>

            <span className="text-zinc-700">·</span>

            <span>{team.played}PJ</span>
          </p>
        </div>
      </div>

      {/* PJ */}
      <span className="hidden text-center text-sm text-zinc-500 sm:block">
        {team.played}
      </span>

      {/* G */}
      <span className="hidden text-center text-sm text-[#c2d116] sm:block">
        {team.wins}
      </span>

      {/* P */}
      <span className="hidden text-center text-sm text-zinc-400 sm:block">
        {team.losses}
      </span>

      {/* PTS */}
      <div className="flex items-center justify-end">
        <span className="min-w-[28px] text-right text-sm font-black text-[#f9f9f9]">
          {team.points}
        </span>
      </div>
    </div>
  );
}

// ============================================
// Componente principal
// ============================================

interface StandingsPreviewProps {
  standings: HomeStanding[];
}

export default function StandingsPreview({
  standings,
}: StandingsPreviewProps) {
  const leader = standings[0];

  return (
    <section className="relative overflow-hidden border-b border-[#f9f9f9]/10 bg-[#1d1d1b]">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#c2d116]/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* ============================================ */}
        {/* Header */}
        {/* ============================================ */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Target size={12} className="text-[#c2d116]" />
              Tabla actual
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c2d116]">
              Tabla de posiciones
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#f9f9f9] sm:text-4xl">
              Así marcha la liga
            </h2>

            <p className="mt-3 max-w-xl text-zinc-400">
              Conocé cómo se encuentran los equipos en la tabla de
              posiciones.
            </p>
          </div>

          <Link
            href="/Posiciones"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#c2d116] transition hover:text-[#d7e52b]"
          >
            Ver tabla completa

            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ============================================ */}
        {/* Contenido */}
        {/* ============================================ */}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ============================================ */}
          {/* Tabla */}
          {/* ============================================ */}

          <div className="overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b]">
            {/* Header */}
            <div className="grid grid-cols-[36px_1fr_auto] items-center gap-3 bg-[#f9f9f9]/[0.04] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:grid-cols-[36px_1fr_50px_50px_50px_70px] sm:gap-4">
              <span>#</span>

              <span>Equipo</span>

              <span className="hidden text-center sm:block">PJ</span>

              <span className="hidden text-center sm:block">G</span>

              <span className="hidden text-center sm:block">P</span>

              <span className="text-right">PTS</span>
            </div>

            {/* Filas */}
            {standings.length > 0 ? (
              standings.map((team, index) => (
                <StandingRow
                  key={team.teamId}
                  team={team}
                  index={index}
                />
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <Trophy
                  size={28}
                  className="mx-auto text-zinc-700"
                />

                <p className="mt-3 text-sm font-semibold text-zinc-400">
                  Todavía no hay posiciones
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  La tabla aparecerá cuando haya equipos registrados.
                </p>
              </div>
            )}

            {/* Leyenda */}
            {standings.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 border-t border-[#f9f9f9]/10 bg-black/20 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-[#c2d116]" />
                  Playoffs
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-[#f9f9f9]" />
                  Zona media
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-zinc-600" />
                  Riesgo
                </span>
              </div>
            )}
          </div>

          {/* ============================================ */}
          {/* Highlights laterales */}
          {/* ============================================ */}

          {leader && (
            <div className="flex flex-col gap-4">
              {/* Card del líder */}
              <div className="relative overflow-hidden rounded-2xl border border-[#c2d116]/20 bg-gradient-to-br from-[#c2d116]/[0.08] via-[#1d1d1b] to-[#1d1d1b] p-5">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#c2d116]/10 blur-3xl" />

                <div className="relative">
                  {/* Título */}
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#c2d116]">
                    <Crown size={12} />
                    Líder de la liga
                  </div>

                  {/* Equipo */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#c2d116]/30 bg-[#c2d116]/10">
                      {leader.logo_url ? (
                        <Image
                          src={leader.logo_url}
                          alt={`Logo de ${leader.team}`}
                          className="h-9 w-9 object-contain"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <span className="text-sm font-black text-[#c2d116]">
                          {leader.team.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-[#f9f9f9]">
                        {leader.team}
                      </p>

                      <p className="text-xs text-zinc-400">
                        {leader.wins}G - {leader.losses}P ·{" "}
                        {leader.played} partidos
                      </p>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/10">
                    <div className="bg-[#1d1d1b] px-3 py-2">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                        Puntos
                      </p>

                      <p className="mt-1 text-lg font-black text-[#c2d116]">
                        {leader.points}
                      </p>
                    </div>

                    <div className="bg-[#1d1d1b] px-3 py-2">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                        Winrate
                      </p>

                      <p className="mt-1 text-lg font-black text-[#f9f9f9]">
                        {getWinrate(leader.wins, leader.played)}%
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/Equipos"
                    className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-[#c2d116]/30 bg-[#c2d116]/[0.06] px-3 py-2 text-xs font-semibold text-[#c2d116] transition hover:bg-[#c2d116]/[0.12]"
                  >
                    Ver equipos
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card informativa */}
              <div className="rounded-2xl border border-[#f9f9f9]/10 bg-gradient-to-br from-[#1d1d1b] to-[#f9f9f9]/[0.03] p-5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  <Trophy
                    size={12}
                    className="text-[#c2d116]"
                  />
                  Estado de la tabla
                </div>

                <ul className="mt-3 space-y-2 text-xs text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c2d116]" />

                    <span>
                      <span className="font-semibold text-[#f9f9f9]">
                        {standings.length}
                      </span>{" "}
                      equipos participan actualmente.
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c2d116]" />

                    <span>
                      La tabla se ordena por{" "}
                      <span className="font-semibold text-[#f9f9f9]">
                        puntos
                      </span>
                      .
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c2d116]" />

                    <span>
                      Los resultados se actualizan al registrar
                      enfrentamientos.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* CTA */}
        {/* ============================================ */}

        <div className="mt-10 flex justify-center">
          <Link
            href="/Posiciones"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#c2d116] px-6 py-3 text-sm font-semibold text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10 transition hover:bg-[#d7e52b] hover:shadow-[#c2d116]/20"
          >
            Ver tabla completa y estadísticas

            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}