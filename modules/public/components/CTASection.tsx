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
    text: "Solo los mejores 4 avanzan a la siguiente fase, ¡no hay lugar para todos!",
  },
  {
    icon: Users,
    text: "Comunidad activa de jugadores de Goya y la región",
  },
  {
    icon: Sparkles,
    text: "Premios para el mejor equipo de la temporada",
  },
];

const INSCRIPTION = {
  slotsTotal: 10,
  slotsTaken: 10,
  deadline: "Hasta agotar cupo",
};

export default function CTASection() {
  const slotsLeft = INSCRIPTION.slotsTotal - INSCRIPTION.slotsTaken;
  const slotsPercent = Math.round(
    (INSCRIPTION.slotsTaken / INSCRIPTION.slotsTotal) * 100
  );

  return (
    <section className="relative overflow-hidden border-b border-[#f9f9f9]/10 bg-[#1d1d1b]">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f9f9f9 1px, transparent 1px), linear-gradient(to bottom, #f9f9f9 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
        {/* Glow verde central */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c2d116]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#c2d116]/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ===== Card principal ===== */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
          {/* Columna izquierda: pitch */}
          <div className="relative overflow-hidden rounded-3xl border border-[#f9f9f9]/10 bg-gradient-to-br from-[#262622] via-[#1d1d1b] to-[#1d1d1b] p-8 sm:p-10">
            {/* Glow interno */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c2d116]/[0.08] blur-3xl" />

            <div className="relative">
              {/* Badge urgencia */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c2d116]/30 bg-[#c2d116]/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#c2d116]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c2d116] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c2d116]" />
                </span>
                Inscripciones Cerradas · Cierra {INSCRIPTION.deadline}
              </div>

              {/* H2 */}
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-[#f9f9f9] sm:text-4xl lg:text-5xl">
                Tu equipo merece
                <span className="block text-[#c2d116]">
                  jugar en la liga de Goya
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#f9f9f9]/65">
                Sumate a la escena competitiva de Counter-Strike 2 del
                litoral. Inscribí tu equipo en minutos y empezá a
                competir contra los mejores de la región.
              </p>

              {/* Beneficios */}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 text-sm text-[#f9f9f9]/80"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c2d116]/10 ring-1 ring-[#c2d116]/30">
                      <Check size={11} className="text-[#c2d116]" />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#c2d116] px-6 py-3.5 text-sm font-bold text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10 transition hover:bg-[#d2e326] hover:shadow-[#c2d116]/20"
                >
                  Inscribir mi equipo
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/Equipos"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f9f9f9]/15 bg-[#f9f9f9]/[0.03] px-6 py-3.5 text-sm font-semibold text-[#f9f9f9] transition hover:border-[#c2d116]/40 hover:bg-[#c2d116]/[0.05]"
                >
                  <Swords size={16} className="text-[#c2d116]" />
                  Ver equipos anotados
                </Link>
              </div>

              {/* Prueba social */}
              <div className="mt-8 flex items-center gap-3 border-t border-[#f9f9f9]/10 pt-6">
                <div className="flex -space-x-2">
                  {["GYS", "CIF", "FNX", "RPA"].map((tag, i) => (
                    <div
                      key={tag}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1d1d1b] bg-[#f9f9f9]/10 text-[9px] font-black text-[#f9f9f9]/80"
                      style={{ zIndex: 10 - i }}
                    >
                      {tag.charAt(0)}
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1d1d1b] bg-[#c2d116] text-[10px] font-black text-[#1d1d1b]">
                    +7
                  </div>
                </div>
                <div className="text-xs text-[#f9f9f9]/50">
                  <span className="font-semibold text-[#f9f9f9]/85">
                    {INSCRIPTION.slotsTaken} equipos
                  </span>{" "}
                  ya están anotados para esta edición
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: cupos + redes */}
          <div className="flex flex-col gap-4">
            {/* Card de cupos */}
            <div className="relative overflow-hidden rounded-3xl border border-[#f9f9f9]/10 bg-gradient-to-b from-[#262622] to-[#1d1d1b] p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/50">
                <Clock size={12} className="text-[#c2d116]" />
                Cupos disponibles
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-black tracking-tight text-[#f9f9f9]">
                    {slotsLeft}
                    <span className="ml-1 text-lg font-bold text-[#f9f9f9]/40">
                      / {INSCRIPTION.slotsTotal}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#f9f9f9]/45">
                    lugares libres
                  </p>
                </div>
                <Trophy size={32} className="text-[#c2d116]/50" />
              </div>

              {/* Barra de progreso */}
              <div className="mt-5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f9f9f9]/10">
                  <div
                    className="h-full rounded-full bg-[#c2d116] transition-all duration-500"
                    style={{ width: `${slotsPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
                  <span className="text-[#f9f9f9]/45">
                    {slotsPercent}% completado
                  </span>
                  <span className="text-[#c2d116]">¡Apurate!</span>
                </div>
              </div>
            </div>

            {/* Card de redes */}
            <div className="rounded-3xl border border-[#f9f9f9]/10 bg-[#1d1d1b] p-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/45">
                Seguí la liga
              </p>

              <p className="mt-3 text-sm text-[#f9f9f9]/60">
                Novedades, fixture y resultados en nuestras redes.
              </p>

              <a
                href="https://www.instagram.com/goyaesports?stkn=MTFjbzF6cWg3eGlmbw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center gap-3 rounded-xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.03] p-3 transition hover:border-[#c2d116]/30 hover:bg-[#f9f9f9]/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c2d116]/20 bg-[#c2d116]/10 text-[#c2d116]">
                  <InstagramIcon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#f9f9f9]">
                    @goyaesports
                  </p>
                  <p className="text-xs text-[#f9f9f9]/45">
                    Novedades y highlights
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#f9f9f9]/40 transition group-hover:translate-x-0.5 group-hover:text-[#c2d116]"
                />
              </a>
            </div>

            {/* Card info */}
            <div className="rounded-3xl border border-[#f9f9f9]/10 bg-gradient-to-br from-[#1d1d1b] to-[#262622] p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/50">
                <Sparkles size={12} className="text-[#c2d116]" />
                Paga la inscripción y jugá
              </div>
              <p className="mt-3 text-sm text-[#f9f9f9]/60">
                Anota a tu equipo es{" "}
                <span className="font-semibold text-[#f9f9f9]">
                  y convertite en el ganador
                </span>
                . Solo necesitás 5 jugadores y muchas ganas de competir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}