"use server";

import {
    createTeam,
    deleteTeam,
    getTeamById,
    updateTeam,
} from "../services/team.service";

import {
    deleteTeamLogo,
    uploadTeamLogo,
} from "../services/team-storage.service";

import {
    createTeamSchema,
    updateTeamSchema,
} from "../schemas/team.schema";


export async function createTeamAction(
    formData: FormData
) {
    const name = formData.get("name");
    const logo = formData.get("logo");

    const validation = createTeamSchema.safeParse({
        name,
        logo_url: null,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos del equipo no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    const file =
        logo instanceof File && logo.size > 0
            ? logo
            : null;

    try {
        // 1. Crear el equipo para obtener su ID.
        const team = await createTeam({
            name: validation.data.name,
            logo_url: null,
        });

        // 2. Si se proporcionó un logo, subirlo.
        if (file) {
            try {
                const logoUrl = await uploadTeamLogo(
                    file,
                    team.id
                );

                // 3. Guardar la URL del logo en el equipo.
                const updatedTeam = await updateTeam(
                    team.id,
                    {
                        name: team.name,
                        logo_url: logoUrl,
                    }
                );

                return {
                    success: true,
                    data: updatedTeam,
                };
            } catch (error) {
                /*
                 * Si falla la subida o actualización del logo,
                 * eliminamos el equipo para evitar un registro
                 * incompleto.
                 */
                await deleteTeam(team.id);

                throw error;
            }
        }

        return {
            success: true,
            data: team,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el equipo.",
        };
    }
}

export async function updateTeamAction(
    id: string,
    formData: FormData
) {
    const name = formData.get("name");
    const logo = formData.get("logo");

    const validation = updateTeamSchema.safeParse({
        name,
        logo_url: null,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos del equipo no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    const file =
        logo instanceof File && logo.size > 0
            ? logo
            : null;

    try {
        // Verificamos que el equipo exista.
        const existingTeam = await getTeamById(id);

        if (!existingTeam) {
            return {
                success: false,
                error: "El equipo no existe.",
            };
        }

        /*
         * Si NO hay un nuevo logo:
         *
         * solamente actualizamos los datos del equipo.
         */
        if (!file) {
            const team = await updateTeam(id, {
                name: validation.data.name,
                logo_url: existingTeam.logo_url,
            });

            return {
                success: true,
                data: team,
            };
        }

        /*
         * Si hay un nuevo logo:
         *
         * uploadTeamLogo utiliza upsert:true y el path
         * teams/{teamId}/logo, por lo que reemplaza
         * automáticamente el logo existente.
         */
        const logoUrl = await uploadTeamLogo(
            file,
            id
        );

        const team = await updateTeam(id, {
            name: validation.data.name,
            logo_url: logoUrl,
        });

        return {
            success: true,
            data: team,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el equipo.",
        };
    }
}

export async function deleteTeamAction(id: string) {
    try {
        // Verificamos que el equipo exista.
        const existingTeam = await getTeamById(id);

        if (!existingTeam) {
            return {
                success: false,
                error: "El equipo no existe.",
            };
        }

        /*
         * Primero eliminamos el logo de Storage.
         *
         * Si no existe, la operación de Storage simplemente
         * no tendrá un archivo que eliminar.
         */
        await deleteTeamLogo(id);

        /*
         * Una vez eliminado el archivo, eliminamos
         * el registro de la base de datos.
         */
        await deleteTeam(id);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el equipo.",
        };
    }
}