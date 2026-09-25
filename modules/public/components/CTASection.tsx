import {
  ArrowRight,
  Trophy,
  Users,
  Calendar,
  Check,
  Sparkles,
  Clock,
  ChevronRight,
  Swords,
} from "lucide-react";
import Link from "next/link";

// Ícono de Instagram inline (por si lucide no lo expone)
function InstagramIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ===== Datos (reemplazar con reales) =====
const benefits = [
  {
    icon: Trophy,
    text: "Competencia oficial con fixture y playoffs",
  },
  {
    icon: Calendar,
    text: "Partidos programados y transmitidos por la liga",
  },
  {
    icon: Users,
    text: "Comunidad activa de jugadores de Goya y la región",
  },
  {
    icon: Sparkles,
    text: "Premios para los mejores equipos de la temporada",
  },
];

const INSCRIPTION = {
  slotsTotal: 16,
  slotsTaken: 11,
  deadline: "15 de Diciembre",
};

export default function CTASection() {
  const slotsLeft = INSCRIPTION.slotsTotal - INSCRIPTION.slotsTaken;
  const slotsPercent = Math.round(
    (INSCRIPTION.slotsTaken / INSCRIPTION.slotsTotal) * 100
  );

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
        {/* Glow rojo central */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ===== Card principal ===== */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
          {/* ========== Columna izquierda: pitch ========== */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8 sm:p-10">
            {/* Glow interno */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />

            <div className="relative">
              {/* Badge urgencia */}
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Inscripciones abiertas · Cierra {INSCRIPTION.deadline}
              </div>

              {/* H2 */}
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Tu equipo merece
                <span className="block text-red-500">
                  jugar en la liga de Goya
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400">
                Sumate a la escena competitiva de Counter-Strike 2 del
                litoral. Inscribí tu equipo en minutos y empezá a
                competir contra los mejores de la región.
              </p>

              {/* Beneficios */}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600/10 ring-1 ring-red-600/30">
                      <Check size={11} className="text-red-400" />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/equipos/inscripcion"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500 hover:shadow-red-900/60"
                >
                  Inscribir mi equipo
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/equipos"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <Swords size={16} className="text-zinc-400" />
                  Ver equipos anotados
                </Link>
              </div>

              {/* Prueba social */}
              <div className="mt-8 flex items-center gap-3 border-t border-zinc-800/80 pt-6">
                <div className="flex -space-x-2">
                  {["GYS", "CIF", "FNX", "RPA"].map((tag, i) => (
                    <div
                      key={tag}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[9px] font-black text-zinc-300"
                      style={{ zIndex: 10 - i }}
                    >
                      {tag.charAt(0)}
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-red-600 text-[10px] font-black text-white">
                    +7
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-300">
                    {INSCRIPTION.slotsTaken} equipos
                  </span>{" "}
                  ya están anotados para esta edición
                </div>
              </div>
            </div>
          </div>

          {/* ========== Columna derecha: cupos + redes ========== */}
          <div className="flex flex-col gap-4">
            {/* Card de cupos */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <Clock size={12} className="text-red-500" />
                Cupos disponibles
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-black tracking-tight text-white">
                    {slotsLeft}
                    <span className="ml-1 text-lg font-bold text-zinc-500">
                      / {INSCRIPTION.slotsTotal}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    lugares libres
                  </p>
                </div>
                <Trophy size={32} className="text-red-500/40" />
              </div>

              {/* Barra de progreso */}
              <div className="mt-5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500"
                    style={{ width: `${slotsPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
                  <span className="text-zinc-500">
                    {slotsPercent}% completado
                  </span>
                  <span className="text-red-400">¡Apurate!</span>
                </div>
              </div>
            </div>

            {/* Card de redes */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Seguí la liga
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                Novedades, fixture y resultados en nuestras redes.
              </p>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 via-red-500 to-amber-500 text-white">
                  <InstagramIcon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    @ligagoyana
                  </p>
                  <p className="text-xs text-zinc-500">
                    Novedades y highlights
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-white"
                />
              </a>
            </div>

            {/* Card info */}
            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/40 p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <Sparkles size={12} className="text-red-500" />
                Sin costo de inscripción
              </div>
              <p className="mt-3 text-sm text-zinc-400">
                Anotar tu equipo es{" "}
                <span className="font-semibold text-white">gratis</span>.
                Solo necesitás 5 jugadores y muchas ganas de competir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}