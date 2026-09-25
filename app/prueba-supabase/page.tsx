import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <main className="min-h-screen bg-zinc-950 p-10 text-white">
            <h1 className="text-2xl font-bold">
                Prueba Supabase
            </h1>

            <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                {user ? (
                    <div>
                        <p className="text-green-400">
                            Usuario autenticado
                        </p>

                        <p className="mt-2 text-zinc-300">
                            Email: {user.email}
                        </p>

                        <p className="mt-2 text-xs text-zinc-500">
                            ID: {user.id}
                        </p>
                    </div>
                ) : (
                    <p className="text-zinc-400">
                        No hay ningún usuario autenticado.
                    </p>
                )}
            </div>
        </main>
    );
}