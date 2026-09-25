import {
  Gamepad2,
  MapPin,
  ArrowUpRight,
  Heart,
  Swords,
  Trophy,
  Users,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

// ===== Instagram =====

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
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ===== Discord =====

function DiscordIcon({
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
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// ===== Navegación =====

const navSections = [
  {
    title: "Competencia",
    links: [
      { name: "Inicio", href: "/", icon: Gamepad2 },
      { name: "Equipos", href: "/Equipos", icon: Users },
      {
        name: "Enfrentamientos",
        href: "/Enfrentamientos",
        icon: Swords,
      },
      {
        name: "Posiciones",
        href: "/Posiciones",
        icon: Trophy,
      },
    ],
  },
  {
    title: "Liga",
    links: [
      {
        name: "Inscribir equipo",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575",
        icon: Trophy,
      },
      {
        name: "Fixture",
        href: "/Enfrentamientos",
        icon: CalendarDays,
      },
      {
        name: "Reglamento",
        href: "/Reglamento",
        icon: Swords,
      },
    ],
  },
];

// ===== Redes =====

const social = {
  instagram: {
    handle: "@goyaesports",
    url: "https://www.instagram.com/goyaesports?stkn=MTFjbzF6cWg3eGlmbw==",
  },
  discord: {
    handle: "Liga Goyana",
    url: "https://discord.com/",
  },
};

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950">
      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-red-600/5 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* ===== Grid principal ===== */}

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* ===== Columna 1: Brand ===== */}

          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-900/40 ring-1 ring-red-500/40 transition group-hover:scale-105">
                <Gamepad2 size={22} className="text-white" />

                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
              </div>

              <div className="leading-none">
                <p className="text-base font-black uppercase tracking-wider text-white">
                  Liga <span className="text-red-500">Goyana</span>
                </p>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Counter-Strike 2
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-500">
              La competencia de esports del litoral. Equipos,
              jugadores y toda la acción de Counter-Strike 2 en
              Goya y la región.
            </p>

            {/* Badge de temporada */}

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              Temporada 2026 en curso
            </div>
          </div>

          {/* ===== Columnas 2 y 3: Navegación ===== */}

          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {section.title}
              </p>

              <nav className="mt-5 flex flex-col gap-3">
                {section.links.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={`${section.title}-${item.href}-${item.name}`}
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                      <Icon
                        size={14}
                        className="text-zinc-700 transition group-hover:text-red-500"
                      />

                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* ===== Columna 4: Comunidad ===== */}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Comunidad
            </p>

            <div className="mt-5 flex items-start gap-2.5 text-sm text-zinc-500">
              <MapPin
                size={14}
                className="mt-0.5 shrink-0 text-zinc-700"
              />

              <span>Goya, Corrientes, Argentina</span>
            </div>

            {/* Redes */}

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Seguinos
            </p>

            <div className="mt-4 space-y-2">
              {/* Instagram */}

              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 via-red-500 to-amber-500 text-white">
                  <InstagramIcon size={15} />
                </div>

                <span className="flex-1 text-xs font-semibold text-zinc-300 transition group-hover:text-white">
                  {social.instagram.handle}
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-zinc-600 transition group-hover:text-white"
                />
              </a>

              {/* Discord */}

              <a
                href={social.discord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5865F2] text-white">
                  <DiscordIcon size={15} />
                </div>

                <span className="flex-1 text-xs font-semibold text-zinc-300 transition group-hover:text-white">
                  {social.discord.handle}
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-zinc-600 transition group-hover:text-white"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ===== Bottom bar ===== */}

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-900 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600">
            <span>
              © {year} Liga Goyana de Esports. Todos los derechos
              reservados.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              Hecho con
              <Heart
                size={10}
                className="fill-red-500 text-red-500"
              />
              en Goya
            </span>

            <span className="hidden text-zinc-800 sm:inline">
              |
            </span>

            <span>
              Desarrollado por{" "}
              <span className="font-medium text-zinc-500">
                Juan Manuel Aguirre
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}