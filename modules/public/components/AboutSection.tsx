import {
  CalendarDays,
  Swords,
  Trophy,
  Users,
  MapPin,
  Shield,
  Radio,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

// ===== Datos =====
type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: boolean;
};

const stats: Stat[] = [
  {
    label: "Equipos",
    value: "8",
    icon: Users,
  },
  {
    label: "Jugadores",
    value: "50+",
    icon: Shield,
  },
  {
    label: "Enfrentamientos",
    value: "Todos contra Todos",
    icon: Swords,
  },
  {
    label: "Edición",
    value: "2026",
    icon: CalendarDays,
    accent: true,
  },
];

const features = [
  "Formato competitivo",
  "Fixture oficial",
  "Playoffs",
  "Comunidad local",
];

const pillars = [
  {
    icon: Trophy,
    title: "Competencia real",
    description:
      "Formato competitivo con fase regular, playoffs y premios para los mejores equipos de la región.",
  },
  {
    icon: Users,
    title: "Comunidad activa",
    description:
      "Jugadores, capitanes y organizadores conectados en un solo lugar. La escena del litoral crece acá.",
  },
  {
    icon: Sparkles,
    title: "Escena en crecimiento",
    description:
      "Una liga pensada para dar visibilidad a equipos emergentes de Goya y alrededores.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* Glow sutil de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* ====== Bloque 1: Story ====== */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <MapPin size={12} className="text-red-500" />
              Goya · Corrientes
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              La competencia
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              El esports también
              <span className="block text-red-500">se juega en Goya</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-zinc-400">
              La Liga Goyana de Esports reúne a equipos y jugadores de la
              región para competir al más alto nivel en{" "}
              <span className="font-semibold text-zinc-200">
                Counter-Strike 2
              </span>
              . Una competencia pensada para darle a la escena local el
              lugar que merece.
            </p>

            {/* Pills de features */}
            <div className="mt-6 flex flex-wrap gap-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs font-medium text-zinc-300"
                >
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA sutil */}
            <Link
              href="/Equipos"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              Conocé los equipos
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ====== Bloque 2: Stats ====== */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`relative bg-zinc-950 p-6 transition ${
                      stat.accent
                        ? "bg-gradient-to-br from-red-950/40 to-zinc-950"
                        : ""
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        stat.accent ? "text-red-500" : "text-zinc-600"
                      }
                    />

                    <p
                      className={`mt-4 text-3xl font-black tracking-tight ${
                        stat.accent ? "text-red-500" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Caption de los stats */}
            <p className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
              <Radio size={12} />
              Datos de la temporada en curso
            </p>
          </div>
        </div>

        {/* ====== Bloque 3: Pilares ====== */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Glow al hover */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-600/0 blur-2xl transition group-hover:bg-red-600/20" />

              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                  <Icon size={18} className="text-red-500" />
                </div>

                <h3 className="mt-4 text-base font-bold text-white">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}