import {
  ArrowRight,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  ChevronRight,
  Target,
} from "lucide-react";
import Link from "next/link";

// ===== Tipos =====
type Trend = "up" | "down" | "same";

type Standing = {
  position: number;
  team: string;
  tag: string;
  played: number;
  wins: number;
  losses: number;
  roundDiff: number; // diferencia de rondas (desempate)
  points: number;
  trend: Trend;
  zone: "playoff" | "mid" | "risk";
};

// ===== Datos (reemplazar con reales) =====
const standings: Standing[] = [
  {
    position: 1,
    team: "Goya Snipers",
    tag: "GYS",
    played: 5,
    wins: 4,
    losses: 1,
    roundDiff: 32,
    points: 12,
    trend: "up",
    zone: "playoff",
  },
  {
    position: 2,
    team: "Corrientes Five",
    tag: "CIF",
    played: 5,
    wins: 3,
    losses: 2,
    roundDiff: 18,
    points: 9,
    trend: "same",
    zone: "playoff",
  },
  {
    position: 3,
    team: "Fenix GG",
    tag: "FNX",
    played: 5,
    wins: 3,
    losses: 2,
    roundDiff: 12,
    points: 9,
    trend: "down",
    zone: "playoff",
  },
  {
    position: 4,
    team: "Río Paraná",
    tag: "RPA",
    played: 5,
    wins: 2,
    losses: 3,
    roundDiff: -4,
    points: 6,
    trend: "up",
    zone: "mid",
  },
  {
    position: 5,
    team: "Chaco Wolves",
    tag: "CHW",
    played: 5,
    wins: 1,
    losses: 4,
    roundDiff: -22,
    points: 3,
    trend: "down",
    zone: "risk",
  },
];

// ===== Helpers =====
const zoneStyles: Record<
  Standing["zone"],
  { bar: string; label: string; text: string }
> = {
  playoff: {
    bar: "bg-emerald-500",
    label: "Playoffs",
    text: "text-emerald-400",
  },
  mid: {
    bar: "bg-amber-500",
    label: "Zona media",
    text: "text-amber-400",
  },
  risk: {
    bar: "bg-red-500",
    label: "Riesgo",
    text: "text-red-400",
  },
};

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up")
    return <TrendingUp size={14} className="text-emerald-400" />;
  if (trend === "down")
    return <TrendingDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-zinc-600" />;
}

// ===== Subcomponente: fila =====
function StandingRow({ team, index }: { team: Standing; index: number }) {
  const zone = zoneStyles[team.zone];
  const isTop3 = team.position <= 3;

  return (
    <div
      className="group relative grid grid-cols-[36px_1fr_auto] items-center gap-3 border-t border-zinc-800 bg-zinc-950 px-4 py-3.5 transition hover:bg-zinc-900/40 sm:grid-cols-[36px_1fr_50px_50px_50px_60px_70px] sm:gap-4"
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
            team.position === 1
              ? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30"
              : team.position === 2
              ? "bg-zinc-300/10 text-zinc-300 ring-1 ring-zinc-300/20"
              : team.position === 3
              ? "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/30"
              : "text-zinc-500"
          }`}
        >
          {team.position}
        </span>
      </div>

      {/* Equipo */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-[10px] font-black tracking-tight ${
            isTop3
              ? "border-zinc-700 bg-zinc-900 text-white"
              : "border-zinc-800 bg-zinc-900/60 text-zinc-400"
          }`}
        >
          {team.tag}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {team.team}
          </p>
          {/* Meta mobile */}
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500 sm:hidden">
            <span className="text-emerald-400">{team.wins}W</span>
            <span className="text-zinc-700">·</span>
            <span className="text-red-400">{team.losses}L</span>
            <span className="text-zinc-700">·</span>
            <span>{team.played}PJ</span>
          </p>
        </div>
      </div>

      {/* Columnas desktop: PJ, G, P, DG, PTS */}
      <span className="hidden text-center text-sm text-zinc-500 sm:block">
        {team.played}
      </span>
      <span className="hidden text-center text-sm text-emerald-400 sm:block">
        {team.wins}
      </span>
      <span className="hidden text-center text-sm text-red-400 sm:block">
        {team.losses}
      </span>
      <span
        className={`hidden text-center text-sm font-medium sm:block ${
          team.roundDiff > 0
            ? "text-emerald-400"
            : team.roundDiff < 0
            ? "text-red-400"
            : "text-zinc-500"
        }`}
      >
        {team.roundDiff > 0 ? `+${team.roundDiff}` : team.roundDiff}
      </span>

      {/* PTS + tendencia */}
      <div className="flex items-center justify-end gap-2">
        <TrendIcon trend={team.trend} />
        <span className="min-w-[28px] text-right text-sm font-black text-white">
          {team.points}
        </span>
      </div>
    </div>
  );
}

// ===== Componente principal =====
export default function StandingsPreview() {
  const leader = standings[0];

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-900/30">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* ===== Header ===== */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Target size={12} className="text-red-500" />
              Jornada 5 de 8
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              Tabla de posiciones
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Así marcha la liga
            </h2>

            <p className="mt-3 max-w-xl text-zinc-500">
              Clasifican los primeros 3 a playoffs. El último pelea por
              mantenerse en la categoría.
            </p>
          </div>

          <Link
            href="/posiciones"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
          >
            Ver tabla completa
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ===== Grid principal: tabla + highlights ===== */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ===== Tabla ===== */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            {/* Header de la tabla */}
            <div className="grid grid-cols-[36px_1fr_auto] items-center gap-3 bg-zinc-900/80 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:grid-cols-[36px_1fr_50px_50px_50px_60px_70px] sm:gap-4">
              <span>#</span>
              <span>Equipo</span>
              <span className="hidden text-center sm:block">PJ</span>
              <span className="hidden text-center sm:block">G</span>
              <span className="hidden text-center sm:block">P</span>
              <span className="hidden text-center sm:block">DG</span>
              <span className="text-right">PTS</span>
            </div>

            {/* Filas */}
            {standings.map((team, i) => (
              <StandingRow key={team.tag} team={team} index={i} />
            ))}

            {/* Leyenda de zonas */}
            <div className="flex flex-wrap items-center gap-4 border-t border-zinc-800 bg-black/30 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-emerald-500" />
                Playoffs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-amber-500" />
                Zona media
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-red-500" />
                Riesgo
              </span>
            </div>
          </div>

          {/* ===== Highlights laterales ===== */}
          <div className="flex flex-col gap-4">
            {/* Card del líder */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 via-zinc-950 to-zinc-950 p-5">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <Crown size={12} />
                  Líder de la liga
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm font-black text-amber-400">
                    {leader.tag}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-bold text-white">
                      {leader.team}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {leader.wins}W - {leader.losses}L ·{" "}
                      <span className="text-emerald-400">
                        +{leader.roundDiff} DG
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
                  <div className="bg-zinc-950 px-3 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                      Puntos
                    </p>
                    <p className="mt-1 text-lg font-black text-amber-400">
                      {leader.points}
                    </p>
                  </div>
                  <div className="bg-zinc-950 px-3 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                      Winrate
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      {Math.round(
                        (leader.wins / leader.played) * 100
                      )}
                      %
                    </p>
                  </div>
                </div>

                <Link
                  href={`/equipos/${leader.tag.toLowerCase()}`}
                  className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/10"
                >
                  Ver equipo
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Card de racha */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <TrendingUp size={12} className="text-emerald-400" />
                En racha
              </div>

              <p className="mt-3 text-sm text-zinc-400">
                <span className="font-semibold text-white">
                  Goya Snipers
                </span>{" "}
                lleva{" "}
                <span className="font-semibold text-emerald-400">
                  4 victorias seguidas
                </span>{" "}
                y es el único invicto de local.
              </p>
            </div>

            {/* Card informativa */}
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/40 p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <Trophy size={12} className="text-red-500" />
                Formato
              </div>

              <ul className="mt-3 space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                  <span>
                    <span className="font-semibold text-white">
                      Top 3
                    </span>{" "}
                    clasifican directo a playoffs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                  <span>
                    <span className="font-semibold text-white">
                      4° y 5°
                    </span>{" "}
                    juegan repechaje
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                  <span>
                    Desempate por{" "}
                    <span className="font-semibold text-white">
                      diferencia de rondas
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===== CTA final ===== */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/posiciones"
            className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500 hover:shadow-red-900/50"
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