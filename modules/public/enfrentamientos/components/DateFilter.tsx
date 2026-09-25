"use client";

import { CalendarDays } from "lucide-react";

interface DateFilterProps {
  dates: {
    id: string;
    name: string;
  }[];
  selectedDateId: string | null;
  onDateChange: (dateId: string | null) => void;
  totalCount?: number;
  countsByDate?: Record<string, number>;
}

export default function DateFilter({
  dates,
  selectedDateId,
  onDateChange,
  totalCount,
  countsByDate = {},
}: DateFilterProps) {
  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        <CalendarDays size={12} className="text-red-500" />
        Filtrar por fecha
      </div>

      {/* Filtros con scroll horizontal en mobile */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {/* Todas */}
        <button
          type="button"
          onClick={() => onDateChange(null)}
          className={`group relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            selectedDateId === null
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            Todas
            {typeof totalCount === "number" && (
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-md px-1.5 text-[10px] font-bold ${
                  selectedDateId === null
                    ? "bg-white/20 text-white"
                    : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300"
                }`}
              >
                {totalCount}
              </span>
            )}
          </span>
        </button>

        {dates.map((date) => {
          const isActive = selectedDateId === date.id;
          const count = countsByDate[date.id];

          return (
            <button
              key={date.id}
              type="button"
              onClick={() => onDateChange(date.id)}
              className={`group relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                {date.name}
                {typeof count === "number" && (
                  <span
                    className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-md px-1.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}