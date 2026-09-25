"use client";

import imageCompression from "browser-image-compression";

import {
    FormEvent,
    useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    ImagePlus,
    Upload,
    X,
} from "lucide-react";

import {
    createTeamAction,
    updateTeamAction,
} from "../actions/team.actions";

import type { Team } from "../types/team.types";

interface TeamFormProps {
    team?: Team | null;
}

export function TeamForm({
    team = null,
}: TeamFormProps) {
    const router = useRouter();

    const isEditing = Boolean(team);

    const [name, setName] = useState(
        team?.name ?? ""
    );

    const [logo, setLogo] = useState<File | null>(
        null
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleLogoChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0] ?? null;

        setError("");

        if (!file) {
            setLogo(null);
            return;
        }

        const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_UPLOAD_SIZE) {
            setError(
                "El logo no puede superar los 5 MB."
            );

            event.target.value = "";

            return;
        }

        try {
            setLoading(true);

            const compressedFile =
                await imageCompression(file, {
                    maxSizeMB: 2,
                    maxWidthOrHeight: 1200,
                    useWebWorker: true,
                    fileType: "image/webp",
                });

            const webpFile = new File(
                [compressedFile],
                "logo.webp",
                {
                    type: "image/webp",
                }
            );

            setLogo(webpFile);
        } catch {
            setError(
                "No se pudo procesar el logo."
            );

            setLogo(null);
        } finally {
            setLoading(false);
        }
    }

    function removeLogo() {
        setLogo(null);
    }

    function handleCancel() {
        router.push("/admin/Equipos");
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError(
                "Ingresá el nombre del equipo."
            );

            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append(
            "name",
            name.trim()
        );

        if (logo) {
            formData.append("logo", logo);
        }

        const result = isEditing
            ? await updateTeamAction(
                  team!.id,
                  formData
              )
            : await createTeamAction(
                  formData
              );

        if (!result.success) {
            setError(
                result.error ??
                    (
                        isEditing
                            ? "No se pudo actualizar el equipo."
                            : "No se pudo crear el equipo."
                    )
            );

            setLoading(false);

            return;
        }

        if (isEditing) {
            router.push("/admin/Equipos");
            router.refresh();

            return;
        }

        setName("");
        setLogo(null);

        setSuccess(
            "Equipo creado correctamente."
        );

        setLoading(false);

        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20"
        >
            {/* Header */}
            <div className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-5">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                        <ImagePlus className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-white">
                            {isEditing
                                ? "Editar equipo"
                                : "Nuevo equipo"}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {isEditing
                                ? "Modificá los datos del equipo."
                                : "Registrá un equipo participante de la Liga Goyana de Esports."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-6 p-6">
                {/* Team name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                        Nombre del equipo
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        placeholder="Ej. Goya Warriors"
                        maxLength={100}
                        disabled={loading}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <div className="mt-2 flex justify-between">
                        <p className="text-xs text-zinc-600">
                            Este nombre será visible públicamente.
                        </p>

                        <span className="text-xs text-zinc-600">
                            {name.length}/100
                        </span>
                    </div>
                </div>

                {/* Logo */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                        Logo del equipo
                    </label>

                    {!logo ? (
                        <div>
                            {isEditing &&
                            team?.logo_url ? (
                                <div className="mb-3 flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                                        <Image
                                            src={
                                                team.logo_url
                                            }
                                            alt={`Logo actual de ${team.name}`}
                                            fill
                                            sizes="56px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-zinc-200">
                                            Logo actual
                                        </p>

                                        <p className="mt-1 text-xs text-zinc-600">
                                            Seleccioná otro archivo
                                            para reemplazarlo.
                                        </p>
                                    </div>
                                </div>
                            ) : null}

                            <label
                                htmlFor="logo"
                                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-8 text-center transition hover:border-amber-500/50 hover:bg-zinc-900"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 transition group-hover:bg-amber-500/10">
                                    <Upload className="h-5 w-5 text-zinc-500 transition group-hover:text-amber-400" />
                                </div>

                                <p className="text-sm font-medium text-zinc-300">
                                    {isEditing
                                        ? "Reemplazar logo"
                                        : "Seleccioná el logo"}
                                </p>

                                <p className="mt-1 text-xs text-zinc-600">
                                    PNG, JPG, WEBP o SVG
                                </p>

                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                    onChange={
                                        handleLogoChange
                                    }
                                    disabled={loading}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                                    <ImagePlus className="h-5 w-5 text-zinc-600" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-zinc-200">
                                        {logo.name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-zinc-600">
                                        {(
                                            logo.size /
                                            1024
                                        ).toFixed(
                                            1
                                        )}{" "}
                                        KB
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    removeLogo
                                }
                                disabled={loading}
                                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Eliminar logo seleccionado"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    <p className="mt-2 text-xs text-zinc-600">
                        {isEditing
                            ? "Si no seleccionás un nuevo logo, se conservará el actual."
                            : "El logo se almacenará en el almacenamiento de la liga."}
                    </p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {success && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                        <p className="text-sm text-emerald-400">
                            {success}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-5">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={
                                handleCancel
                            }
                            disabled={loading}
                            className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? isEditing
                                ? "Guardando cambios..."
                                : "Creando equipo..."
                            : isEditing
                            ? "Guardar cambios"
                            : "Crear equipo"}
                    </button>
                </div>
            </div>
        </form>
    );
}