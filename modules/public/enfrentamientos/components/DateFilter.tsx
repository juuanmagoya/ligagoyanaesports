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
      {/* Etiqueta */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f9f9f9]/50">
        <CalendarDays size={12} className="text-[#c2d116]" />
        Filtrar por fecha
      </div>

      {/* Filtros con scroll horizontal en mobile */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {/* Todas */}
        <button
          type="button"
          onClick={() => onDateChange(null)}
          className={`group relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            selectedDateId === null
              ? "bg-[#c2d116] text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10"
              : "border border-[#f9f9f9]/10 bg-[#1d1d1b]/80 text-[#f9f9f9]/60 hover:border-[#c2d116]/40 hover:bg-[#242421] hover:text-[#f9f9f9]"
          }`}
        >
          <span className="flex items-center gap-2">
            Todas

            {typeof totalCount === "number" && (
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] font-bold ${
                  selectedDateId === null
                    ? "bg-[#1d1d1b]/10 text-[#1d1d1b]"
                    : "bg-[#f9f9f9]/5 text-[#f9f9f9]/50 group-hover:bg-[#c2d116]/10 group-hover:text-[#c2d116]"
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
              className={`group relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#c2d116] text-[#1d1d1b] shadow-lg shadow-[#c2d116]/10"
                  : "border border-[#f9f9f9]/10 bg-[#1d1d1b]/80 text-[#f9f9f9]/60 hover:border-[#c2d116]/40 hover:bg-[#242421] hover:text-[#f9f9f9]"
              }`}
            >
              <span className="flex items-center gap-2">
                {date.name}

                {typeof count === "number" && (
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-[#1d1d1b]/10 text-[#1d1d1b]"
                        : "bg-[#f9f9f9]/5 text-[#f9f9f9]/50 group-hover:bg-[#c2d116]/10 group-hover:text-[#c2d116]"
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