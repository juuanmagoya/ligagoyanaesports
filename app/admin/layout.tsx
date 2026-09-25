"use client";

import {
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Menu,
  Swords,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Equipos",
    href: "/admin/Equipos",
    icon: Users,
  },
  {
    name: "Enfrentamientos",
    href: "/admin/Enfrentamientos",
    icon: Swords,
  },
  {
    name: "Fechas",
    href: "/admin/Fechas",
    icon: LayoutDashboard,
  },
  {
    name: "Posiciones",
    href: "/admin/Posiciones",
    icon: Trophy,
  },
  {
    name: "Jugadores",
    href: "/admin/Jugadores",
    icon: Users,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Mobile header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 lg:hidden">
        <Link
          href="/admin/Dashboard"
          className="flex items-center gap-2 font-bold"
        >
          <Gamepad2 className="text-red-500" size={24} />
          Liga Goyana
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800 bg-zinc-900 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <Link
            href="/admin/Dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <Gamepad2 size={20} />
            </div>

            <div>
              <p className="font-bold leading-tight">
                Liga Goyana
              </p>

              <p className="text-xs text-zinc-500">
                Esports
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Administración
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-zinc-800 p-3">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 font-semibold text-red-400">
              AD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Administrador
              </p>

              <p className="truncate text-xs text-zinc-500">
                admin@ligagoyana.com
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-[calc(100vh-4rem)] lg:min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}