import PublicNavbar from "@/modules/public/components/PublicNavbar";
import PublicFooter from "@/modules/public/components/PublicFooter";
import PublicStandingsTable from "@/modules/public/posiciones/components/PublicStandingsTable";
import { getPublicPositions } from "@/modules/public/posiciones/services/standings.service";

import { Trophy, Swords, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function PosicionesPage() {
  const positions = await getPublicPositions();

  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-zinc-950 text-white">
        {/* ===== Header de página ===== */}
        <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
          {/* Glow de fondo */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            />
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-orange-500/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <Trophy size={12} className="text-red-500" />
              Tabla oficial
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              Competencia
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Tabla de{" "}
              <span className="relative inline-block text-red-500">
                posiciones
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-red-500 to-transparent" />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
              Clasificación actual de los equipos de la Liga Goyana de
              Counter-Strike 2. El equipo con más puntos al final de la
              temporada se consagra campeón.
            </p>

            {/* CTAs secundarios del header */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/Enfrentamientos"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
              >
                <Swords size={15} />
                Ver enfrentamientos
                <ChevronRight
                  size={15}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/Equipos"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <Users size={15} />
                Ver equipos
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Tabla ===== */}
        <section className="relative bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <PublicStandingsTable
              positions={positions}
              round="Temporada 2026"
            />
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}