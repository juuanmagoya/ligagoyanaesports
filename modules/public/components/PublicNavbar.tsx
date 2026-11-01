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
          ? "border-[#f9f9f9]/10 bg-[#1d1d1b]/95 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-[#1d1d1b]/70 backdrop-blur-md"
      }`}
    >
      {/* Barra principal */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Liga Goyana de CS2 - Inicio"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#c2d116] to-[#8f9b0b] shadow-lg shadow-[#c2d116]/10 ring-1 ring-[#c2d116]/40 transition group-hover:scale-105">
            <Gamepad2 size={20} className="text-[#1d1d1b]" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#c2d116] ring-2 ring-[#1d1d1b]" />
          </div>

          <div className="leading-none">
            <p className="text-[15px] font-black uppercase tracking-wider text-[#f9f9f9]">
              Liga <span className="text-[#c2d116]">Goyana</span>
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f9f9f9]/40">
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
                    ? "text-[#f9f9f9]"
                    : "text-[#f9f9f9]/60 hover:bg-[#f9f9f9]/5 hover:text-[#f9f9f9]"
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-[#c2d116]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/Enfrentamientos"
            className="flex items-center gap-2 rounded-lg border border-[#f9f9f9]/10 px-3.5 py-2 text-sm font-medium text-[#f9f9f9]/75 transition hover:border-[#c2d116]/30 hover:bg-[#f9f9f9]/5 hover:text-[#f9f9f9]"
          >
            <Swords size={14} className="text-[#c2d116]" />
            Partidos
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
            className="group flex items-center gap-1.5 rounded-lg bg-[#c2d116] px-4 py-2 text-sm font-semibold text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10 transition hover:bg-[#d2e326]"
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
          className="rounded-lg p-2 text-[#f9f9f9]/60 transition hover:bg-[#f9f9f9]/5 hover:text-[#f9f9f9] md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Drawer mobile */}
      <div
        className={`overflow-hidden border-t border-[#f9f9f9]/10 bg-[#1d1d1b] transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
          {/* Card próximo partido */}
          <Link
            href="/enfrentamientos"
            onClick={closeMenu}
            className="mb-3 flex items-center gap-3 rounded-xl border border-[#f9f9f9]/10 bg-[#f9f9f9]/[0.04] p-3 transition hover:border-[#c2d116]/30"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c2d116]/10 ring-1 ring-[#c2d116]/30">
              <Calendar size={16} className="text-[#c2d116]" />
            </div>
            <ChevronRight size={16} className="text-[#f9f9f9]/40" />
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
                    ? "bg-[#f9f9f9]/[0.06] text-[#f9f9f9]"
                    : "text-[#f9f9f9]/60 hover:bg-[#f9f9f9]/[0.04] hover:text-[#f9f9f9]"
                }`}
              >
                {Icon && (
                  <Icon
                    size={18}
                    className={active ? "text-[#c2d116]" : ""}
                  />
                )}
                {item.name}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c2d116]" />
                )}
              </Link>
            );
          })}

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScu-xZBoxtdrlhufSbv9_BvJ4RbIkLcQ5VGm4Qouxn8kYSGeQ/viewform?usp=sharing&ouid=110350065218398989575"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#c2d116] px-4 py-3 text-center text-sm font-semibold text-[#1d1d1b] transition hover:bg-[#d2e326]"
          >
            Inscribir equipo
            <ChevronRight size={16} />
          </Link>

          <div className="mt-4 flex items-center justify-center gap-3 border-t border-[#f9f9f9]/10 pt-4">
            <a
              href="https://www.instagram.com/goyaesports?stkn=MTFjbzF6cWg3eGlmbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-[#f9f9f9]/45 transition hover:bg-[#f9f9f9]/5 hover:text-[#c2d116]"
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