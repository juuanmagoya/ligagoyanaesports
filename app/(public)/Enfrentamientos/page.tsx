import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Trophy,
  Users,
} from "lucide-react";

import PublicNavbar from "@/modules/public/components/PublicNavbar";
import PublicFooter from "@/modules/public/components/PublicFooter";
import PublicMatches from "@/modules/public/enfrentamientos/components/PublicMatches";
import { getPublicMatches } from "@/modules/public/enfrentamientos/services/matches.service";

export default async function EnfrentamientosPage() {
  const matches = await getPublicMatches();

  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-[#1d1d1b] text-[#f9f9f9]">
        {/* Encabezado de página */}
        <section className="relative overflow-hidden border-b border-[#f9f9f9]/10 bg-[#1d1d1b]">
          {/* Efectos de fondo */}
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

            <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-[#c2d116]/10 blur-[120px]" />

            <div className="absolute right-0 top-1/3 size-64 rounded-full bg-[#c2d116]/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {/* Etiqueta */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f9f9f9]/10 bg-[#f9f9f9]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f9f9f9]/60">
              <CalendarDays size={12} className="text-[#c2d116]" />
              Calendario oficial
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c2d116]">
              Competencia
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#f9f9f9] sm:text-5xl lg:text-6xl">
              Enfrenta
              <span className="relative inline-block text-[#c2d116]">
                mientos
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-[#c2d116] to-transparent" />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#f9f9f9]/60">
              Consulta todos los enfrentamientos de la Liga Goyana de
              Counter-Strike 2 y filtra los partidos correspondientes a cada
              fecha de competencia.
            </p>

            {/* Acciones secundarias */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/Posiciones"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#c2d116] px-5 py-2.5 text-sm font-semibold text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10 transition-colors hover:bg-[#d2e326]"
              >
                <Trophy size={15} />
                Ver posiciones
                <ChevronRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/Equipos"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f9f9f9]/10 bg-[#f9f9f9]/5 px-5 py-2.5 text-sm font-semibold text-[#f9f9f9]/80 transition-colors hover:border-[#c2d116]/40 hover:bg-[#c2d116]/5 hover:text-[#c2d116]"
              >
                <Users size={15} />
                Ver equipos
              </Link>
            </div>
          </div>
        </section>

        {/* Enfrentamientos */}
        <section className="relative bg-[#1d1d1b]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <PublicMatches matches={matches} />
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}