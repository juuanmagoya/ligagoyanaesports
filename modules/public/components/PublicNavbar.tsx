"use client";

import {
  Gamepad2,
  Menu,
  Swords,
  Trophy,
  Users,
  X,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Ícono de Instagram inline (por si lucide-react no lo expone)
function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
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

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Equipos", href: "/Equipos", icon: Users },
  { name: "Enfrentamientos", href: "/Enfrentamientos", icon: Swords },
  { name: "Posiciones", href: "/Posiciones", icon: Trophy },
];



export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-zinc-800/80 bg-zinc-950/95 shadow-lg shadow-black/40 backdrop-blur-xl"
          : "border-transparent bg-zinc-950/70 backdrop-blur-md"
      }`}
    >

      {/* Barra principal */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Liga Goyana de CS2 - Inicio"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-900/40 ring-1 ring-red-500/40 transition group-hover:scale-105">
            <Gamepad2 size={20} className="text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
          </div>

          <div className="leading-none">
            <p className="text-[15px] font-black uppercase tracking-wider text-white">
              Liga <span className="text-red-500">Goyana</span>
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Counter-Strike 2
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/Enfrentamientos"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3.5 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          >
            <Swords size={14} className="text-red-500" />
            Partidos
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
            className="group flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
          >
            Inscribir equipo
            <ChevronRight
              size={14}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Drawer mobile */}
      <div
        className={`overflow-hidden border-t border-zinc-800 bg-zinc-950 transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
          {/* Card próximo partido */}
          <Link
            href="/enfrentamientos"
            onClick={closeMenu}
            className="mb-3 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 transition hover:border-red-600/40"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 ring-1 ring-red-600/30">
              <Calendar size={16} className="text-red-400" />
            </div>
            <ChevronRight size={16} className="text-zinc-500" />
          </Link>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {Icon && (
                  <Icon size={18} className={active ? "text-red-500" : ""} />
                )}
                {item.name}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Inscribir equipo
            <ChevronRight size={16} />
          </Link>

          <div className="mt-4 flex items-center justify-center gap-3 border-t border-zinc-900 pt-4">
            <a
              href="https://www.instagram.com/goyaesports?stkn=MTFjbzF6cWg3eGlmbw=="

              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
              aria-label="Instagram de la Liga Goyana"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}