import {
  ArrowRight,
  Crosshair,
  Calendar,
  Trophy,
  Users,
  ChevronRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

import type {
  HomeLastMatch,
  HomeStanding,
  HomeStats,
} from "../types/home.types";

interface HeroSectionProps {
  stats: HomeStats;
  lastMatch: HomeLastMatch | null;
  standings: HomeStanding[];
}

export default function HeroSection({
  stats,
  lastMatch,
  standings,
}: HeroSectionProps) {
  const STATS = [
    {
      icon: Users,
      label: "Equipos",
      value: stats.teams.toString(),
    },
    {
      icon: Crosshair,
      label: "Jugadores",
      value: `${stats.players}+`,
    },
    {
      icon: Trophy,
      label: "Prize Pool",
      value: "—",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#1d1d1b] bg-[#1d1d1b]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f9f9f9 1px, transparent 1px), linear-gradient(to bottom, #f9f9f9 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c2d116]/10 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#c2d116]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
        {/* Columna izquierda */}
        <div className="animate-fade-up">
          {/* Badge de estado */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c2d116]/25 bg-[#c2d116]/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#c2d116]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c2d116] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c2d116]" />
            </span>

            Inscripciones abiertas · Temporada 2026
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#f9f9f9]/50">
            Liga Goyana de Esports
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-[#f9f9f9] sm:text-6xl lg:text-7xl">
            La liga de{" "}
            <span className="relative inline-block text-[#c2d116]">
              Counter-Strike 2
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#c2d116] to-transparent" />
            </span>{" "}
            de Goya
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-[#f9f9f9]/65 sm:text-lg">
            Competencia oficial con equipos de Goya y la región. Fixture
            completo, tabla en vivo y playoffs. Sumate a la escena
            competitiva del litoral.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#c2d116] px-6 py-3 text-sm font-bold text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10 transition hover:bg-[#d2e326] hover:shadow-[#c2d116]/20"
            >
              <Flame size={17} />
              Inscribir mi equipo
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/Enfrentamientos"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f9f9f9]/15 bg-[#f9f9f9]/[0.04] px-6 py-3 text-sm font-semibold text-[#f9f9f9] transition hover:border-[#c2d116]/50 hover:bg-[#c2d116]/[0.06]"
            >
              <Calendar size={16} className="text-[#c2d116]" />
              Ver fixture
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#f9f9f9]/10 pt-8">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 text-[#f9f9f9]/45">
                  <Icon size={12} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {label}
                  </span>
                </div>

                <p className="mt-2 text-2xl font-black text-[#f9f9f9] sm:text-3xl">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: panel de información */}
        <div className="relative hidden lg:block">
          <div className="relative animate-fade-up">
            {/* Glow detrás del panel */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#c2d116]/15 via-transparent to-[#c2d116]/[0.03] blur-2xl" />

            {/* Panel principal */}
            <div className="relative overflow-hidden rounded-2xl border border-[#f9f9f9]/10 bg-[#1d1d1b] shadow-2xl shadow-black/30">
              {/* Header del panel */}
              <div className="flex items-center justify-between border-b border-[#f9f9f9]/10 bg-black/20 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Crosshair size={14} className="text-[#c2d116]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f9f9f9]/60">
                    Último enfrentamiento
                  </span>
                </div>

                <span className="rounded-full bg-[#f9f9f9]/[0.06] px-2 py-0.5 text-[10px] font-semibold text-[#f9f9f9]/60">
                  Resultado
                </span>
              </div>

              {/* Cuerpo último enfrentamiento */}
              <div className="p-6">
                {lastMatch ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      {/* Equipo A */}
                      <div className="flex-1 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04] text-lg font-black text-[#f9f9f9]">
                          {lastMatch.teamA.name.charAt(0)}
                        </div>

                        <p className="mt-3 text-sm font-semibold text-[#f9f9f9]">
                          {lastMatch.teamA.name}
                        </p>
                      </div>

                      {/* Resultado */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-[#f9f9f9]">
                          {lastMatch.scoreA} - {lastMatch.scoreB}
                        </span>

                        <span className="mt-1 text-[10px] uppercase tracking-widest text-[#f9f9f9]/35">
                          Resultado
                        </span>
                      </div>

                      {/* Equipo B */}
                      <div className="flex-1 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04] text-lg font-black text-[#f9f9f9]">
                          {lastMatch.teamB.name.charAt(0)}
                        </div>

                        <p className="mt-3 text-sm font-semibold text-[#f9f9f9]">
                          {lastMatch.teamB.name}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.03] px-4 py-2 text-xs text-[#f9f9f9]/60">
                      <Trophy size={12} className="text-[#c2d116]" />
                      Enfrentamiento registrado
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[170px] flex-col items-center justify-center text-center">
                    <Crosshair size={28} className="text-[#f9f9f9]/20" />

                    <p className="mt-4 text-sm font-semibold text-[#f9f9f9]/80">
                      Todavía no hay enfrentamientos
                    </p>

                    <p className="mt-1 text-xs text-[#f9f9f9]/40">
                      Los resultados aparecerán aquí cuando se registre el primer partido.
                    </p>
                  </div>
                )}
              </div>

              {/* Standings mini */}
              <div className="border-t border-[#f9f9f9]/10 bg-black/10 px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f9f9f9]/45">
                    Top posiciones
                  </span>

                  <Link
                    href="/Posiciones"
                    className="text-[10px] font-semibold uppercase tracking-wider text-[#c2d116] transition hover:text-[#d2e326]"
                  >
                    Ver todo
                  </Link>
                </div>

                {standings.length > 0 ? (
                  <ul className="space-y-2">
                    {standings.map((standing) => (
                      <li
                        key={standing.pos}
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#f9f9f9]/[0.04]"
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded text-[11px] font-black ${
                            standing.pos === 1
                              ? "bg-[#c2d116]/15 text-[#c2d116] ring-1 ring-[#c2d116]/35"
                              : standing.pos === 2
                                ? "bg-[#f9f9f9]/10 text-[#f9f9f9]/80 ring-1 ring-[#f9f9f9]/15"
                                : "bg-[#f9f9f9]/[0.04] text-[#f9f9f9]/50 ring-1 ring-[#f9f9f9]/10"
                          }`}
                        >
                          {standing.pos}
                        </span>

                        <span className="flex-1 text-sm font-medium text-[#f9f9f9]/85">
                          {standing.team}
                        </span>

                        <span className="text-sm font-bold text-[#f9f9f9]">
                          {standing.points}
                          <span className="ml-1 text-[10px] font-normal uppercase text-[#f9f9f9]/40">
                            pts
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-center text-xs text-[#f9f9f9]/40">
                    Todavía no hay posiciones disponibles.
                  </p>
                )}

                <Link
                  href="/Posiciones"
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#f9f9f9]/10 px-3 py-2 text-xs font-semibold text-[#f9f9f9]/75 transition hover:border-[#c2d116]/40 hover:bg-[#c2d116]/[0.05] hover:text-[#f9f9f9]"
                >
                  Tabla completa
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}