import {
    CalendarDays,
    Shield,
    Swords,
    Trophy,
    Users,
} from "lucide-react";

const stats = [
    {
        label: "Equipos registrados",
        value: "4",
        description: "Equipos activos",
        icon: Shield,
    },
    {
        label: "Jugadores",
        value: "20",
        description: "Jugadores registrados",
        icon: Users,
    },
    {
        label: "Enfrentamientos",
        value: "12",
        description: "Esta temporada",
        icon: Swords,
    },
    {
        label: "Partidos finalizados",
        value: "8",
        description: "Resultados registrados",
        icon: Trophy,
    },
];

const upcomingMatches = [
    {
        id: 1,
        date: "15 Sep",
        time: "21:00",
        teamA: "Lobos Gaming",
        teamB: "Goya Esports",
        map: "Por definir",
    },
    {
        id: 2,
        date: "17 Sep",
        time: "21:00",
        teamA: "Corrientes Five",
        teamB: "Northern Wolves",
        map: "Por definir",
    },
    {
        id: 3,
        date: "20 Sep",
        time: "22:00",
        teamA: "Lobos Gaming",
        teamB: "Northern Wolves",
        map: "Por definir",
    },
];

const standings = [
    {
        position: 1,
        team: "Lobos Gaming",
        played: 4,
        wins: 3,
        losses: 1,
        points: 9,
    },
    {
        position: 2,
        team: "Goya Esports",
        played: 4,
        wins: 3,
        losses: 1,
        points: 9,
    },
    {
        position: 3,
        team: "Northern Wolves",
        played: 4,
        wins: 2,
        losses: 2,
        points: 6,
    },
    {
        position: 4,
        team: "Corrientes Five",
        played: 4,
        wins: 0,
        losses: 4,
        points: 0,
    },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Resumen general de la Liga Goyana de Esports.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-zinc-400">
                                        {stat.label}
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-white">
                                        {stat.value}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-zinc-500">
                                {stat.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Main content */}
            <div className="grid gap-6 xl:grid-cols-3">
                {/* Upcoming matches */}
                <div className="xl:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                        <div>
                            <h2 className="font-semibold text-white">
                                Próximos enfrentamientos
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Partidos programados próximamente.
                            </p>
                        </div>

                        <CalendarDays className="h-5 w-5 text-zinc-500" />
                    </div>

                    <div className="divide-y divide-zinc-800">
                        {upcomingMatches.map((match) => (
                            <div
                                key={match.id}
                                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="min-w-[70px] text-center">
                                        <p className="text-sm font-semibold text-white">
                                            {match.date}
                                        </p>

                                        <p className="text-xs text-zinc-500">
                                            {match.time}
                                        </p>
                                    </div>

                                    <div className="h-10 w-px bg-zinc-800" />

                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {match.teamA}
                                        </p>

                                        <p className="my-1 text-xs text-zinc-600">
                                            VS
                                        </p>

                                        <p className="text-sm font-medium text-white">
                                            {match.teamB}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right">
                                    <span className="inline-flex rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                                        Programado
                                    </span>

                                    <p className="mt-2 text-xs text-zinc-500">
                                        {match.map}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tournament info */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
                            <Trophy className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-white">
                                Liga Goyana CS2
                            </h2>

                            <p className="text-sm text-zinc-500">
                                Temporada 2026
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                                Estado
                            </span>

                            <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                                En curso
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                                Equipos
                            </span>

                            <span className="text-sm font-medium text-white">
                                4
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                                Jugadores
                            </span>

                            <span className="text-sm font-medium text-white">
                                20
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                                Partidos jugados
                            </span>

                            <span className="text-sm font-medium text-white">
                                8
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Standings */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900">
                <div className="border-b border-zinc-800 px-6 py-4">
                    <h2 className="font-semibold text-white">
                        Tabla de posiciones
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Clasificación actual de los equipos.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-zinc-800 bg-zinc-950/50">
                            <tr className="text-xs uppercase tracking-wider text-zinc-500">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Equipo</th>
                                <th className="px-6 py-3 text-center">
                                    PJ
                                </th>
                                <th className="px-6 py-3 text-center">
                                    PG
                                </th>
                                <th className="px-6 py-3 text-center">
                                    PP
                                </th>
                                <th className="px-6 py-3 text-right">
                                    Puntos
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800">
                            {standings.map((team) => (
                                <tr
                                    key={team.team}
                                    className="transition hover:bg-zinc-800/40"
                                >
                                    <td className="px-6 py-4 text-sm font-semibold text-zinc-400">
                                        {team.position}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-white">
                                            {team.team}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center text-sm text-zinc-400">
                                        {team.played}
                                    </td>

                                    <td className="px-6 py-4 text-center text-sm text-green-400">
                                        {team.wins}
                                    </td>

                                    <td className="px-6 py-4 text-center text-sm text-red-400">
                                        {team.losses}
                                    </td>

                                    <td className="px-6 py-4 text-right text-sm font-bold text-white">
                                        {team.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}