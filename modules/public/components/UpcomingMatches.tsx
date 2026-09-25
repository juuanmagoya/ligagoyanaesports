import {
  ArrowRight,
  CalendarDays,
  Clock,
  Map as MapIcon,
  Flame,
  ChevronRight,
  Swords,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

// ===== Tipos =====
type TeamRef = {
  name: string;
  tag: string;
  wins: number;
  losses: number;
};

type Match = {
  id: string;
  teamA: TeamRef;
  teamB: TeamRef;
  date: string;       // "Sáb 14"
  month: string;      // "DIC"
  time: string;       // "20:00"
  map: string;        // "Mirage"
  format: string;     // "BO3"
  round: string;      // "Jornada 5"
  featured?: boolean; // partido destacado
};

// ===== Datos (reemplazar con reales) =====
const matches: Match[] = [
  {
    id: "m1",
    teamA: { name: "Goya Snipers", tag: "GYS", wins: 12, losses: 1 },
    teamB: { name: "Corrientes Five", tag: "CIF", wins: 10, losses: 3 },
    date: "Sáb 14",
    month: "DIC",
    time: "21:00",
    map: "Mirage",
    format: "BO3",
    round: "Jornada 5",
    featured: true,
  },
  {
    id: "m2",
    teamA: { name: "Fenix GG", tag: "FNX", wins: 8, losses: 5 },
    teamB: { name: "Río Paraná", tag: "RPA", wins: 7, losses: 6 },
    date: "Sáb 14",
    month: "DIC",
    time: "22:30",
    map: "Inferno",
    format: "BO1",
    round: "Jornada 5",
  },
  {
    id: "m3",
    teamA: { name: "Goya Snipers", tag: "GYS", wins: 12, losses: 1 },
    teamB: { name: "Fenix GG", tag: "FNX", wins: 8, losses: 5 },
    date: "Dom 15",
    month: "DIC",
    time: "20:00",
    map: "Ancient",
    format: "BO3",
    round: "Jornada 6",
  },
];

// ===== Helpers =====
const winrate = (w: number, l: number) =>
  Math.round((w / (w + l)) * 100);

// ===== Subcomponente: TeamBlock =====
function TeamBlock({
  team,
  align,
}: {
  team: TeamRef;
  align: "left" | "right";
}) {
  const wr = winrate(team.wins, team.losses);
  const isRight = align === "right";

  return (
    <div
      className={`flex items-center gap-3 ${
        isRight ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      {/* Avatar con tag */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-black tracking-tight text-white">
        {team.tag}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {team.name}
        </p>
        <p className="mt-0.5 text-[11px] text-zinc-500">
          <span className="text-emerald-400">{team.wins}W</span>
          <span className="mx-1 text-zinc-700">·</span>
          <span className="text-red-400">{team.losses}L</span>
          <span className="mx-1 text-zinc-700">·</span>
          <span>{wr}%</span>
        </p>
      </div>
    </div>
  );
}

// ===== Subcomponente: MatchRow =====
function MatchRow({ match }: { match: Match }) {
  const isFeatured = !!match.featured;

  return (
    <Link
      href={`/enfrentamientos/${match.id}`}
      className={`group relative block overflow-hidden rounded-2xl border transition ${
        isFeatured
          ? "border-red-600/30 bg-gradient-to-r from-red-950/20 via-zinc-950 to-zinc-950 hover:border-red-500/50"
          : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/60"
      }`}
    >
      {/* Glow al hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/0 blur-3xl transition group-hover:bg-red-600/15" />

      {/* Badge destacado */}
      {isFeatured && (
        <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
          <Flame size={10} />
          Destacado
        </div>
      )}

      <div className="relative grid gap-4 p-5 md:grid-cols-[140px_1fr_140px] md:items-center md:gap-6">
        {/* ===== Fecha ===== */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border ${
              isFeatured
                ? "border-red-600/40 bg-red-600/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${
                isFeatured ? "text-red-400" : "text-zinc-500"
              }`}
            >
              {match.month}
            </span>
            <span className="text-lg font-black leading-none text-white">
              {match.date.split(" ")[1]}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {match.round}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-300">
              <Clock size={12} className="text-zinc-500" />
              {match.time}
            </p>
            <p className="mt-1 hidden items-center gap-1.5 text-[11px] text-zinc-600 md:flex">
              <MapIcon size={10} />
              {match.map}
              <span className="text-zinc-700">·</span>
              {match.format}
            </p>
          </div>
        </div>

        {/* ===== Equipos ===== */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <TeamBlock team={match.teamA} align="left" />

          {/* VS central */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                isFeatured
                  ? "border-red-600/40 bg-red-600/10 text-red-400"
                  : "border-zinc-800 bg-zinc-900 text-zinc-500"
              }`}
            >
              <Swords size={14} />
            </div>
            <span
              className={`text-[9px] font-black uppercase tracking-widest ${
                isFeatured ? "text-red-400" : "text-zinc-600"
              }`}
            >
              VS
            </span>
          </div>

          <TeamBlock team={match.teamB} align="right" />
        </div>

        {/* ===== CTA derecha ===== */}
        <div className="flex items-center justify-between gap-3 md:justify-end">
          {/* Map info mobile */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 md:hidden">
            <MapIcon size={12} />
            {match.map}
            <span className="text-zinc-700">·</span>
            {match.format}
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              isFeatured
                ? "border-red-600/40 bg-red-600/10 text-red-400 group-hover:bg-red-600/20"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 group-hover:border-zinc-700 group-hover:bg-zinc-800"
            }`}
          >
            Ver detalle
            <ChevronRight
              size={12}
              className="transition group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ===== Componente principal =====
export default function UpcomingMatches() {
  // Agrupar por jornada
  const matchesByRound = matches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      if (!acc[match.round]) acc[match.round] = [];
      acc[match.round].push(match);
      return acc;
    },
    {}
  );

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-red-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* ===== Header ===== */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <CalendarDays size={12} className="text-red-500" />
              Fixture oficial
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              Fixture
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Próximos enfrentamientos
            </h2>

            <p className="mt-3 max-w-xl text-zinc-500">
              Los partidos que se vienen en la liga. Revisá horarios,
              mapas y el estado de cada equipo.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/enfrentamientos"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              Ver fixture completo
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/posiciones"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
            >
              <Swords size={12} />
              Ver posiciones
            </Link>
          </div>
        </div>

        {/* ===== Lista de partidos agrupados por jornada ===== */}
        <div className="mt-12 space-y-8">
          {Object.entries(matchesByRound).map(([round, roundMatches]) => (
            <div key={round}>
              {/* Divisor de jornada */}
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  {round}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  {roundMatches.length}{" "}
                  {roundMatches.length === 1 ? "partido" : "partidos"}
                </span>
              </div>

              {/* Partidos de esta jornada */}
              <div className="space-y-3">
                {roundMatches.map((match) => (
                  <MatchRow key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}