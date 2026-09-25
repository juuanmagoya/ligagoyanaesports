import { DateForm } from "@/modules/admin/fechas/components/DateForm";
import { DateTable } from "@/modules/admin/fechas/components/DateTable";

import {
    getDateById,
    getDates,
} from "@/modules/admin/fechas/services/date.service";

interface DatesPageProps {
    searchParams: Promise<{
        edit?: string;
    }>;
}

export default async function DatesPage({
    searchParams,
}: DatesPageProps) {
    const params = await searchParams;

    const dates = await getDates();

    const editingDate = params.edit
        ? await getDateById(params.edit)
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Fechas
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                    Gestioná las fechas de competición de
                    la liga.
                </p>
            </div>

            <DateForm
                key={editingDate?.id ?? "new"}
                date={editingDate}
            />

            <DateTable dates={dates} />
        </div>
    );
}