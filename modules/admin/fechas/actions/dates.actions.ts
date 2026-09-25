"use server";

import {
    createDate,
    deleteDate,
    getDateById,
    updateDate,
} from "../services/date.service";

import {
    createDateSchema,
    updateDateSchema,
} from "../schemas/date.schema";

export async function createDateAction(
    formData: FormData
) {
    const name = formData.get("name");

    const validation = createDateSchema.safeParse({
        name,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos de la fecha no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const date = await createDate(
            validation.data
        );

        return {
            success: true,
            data: date,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear la fecha.",
        };
    }
}

export async function updateDateAction(
    id: string,
    formData: FormData
) {
    const name = formData.get("name");

    const validation = updateDateSchema.safeParse({
        name,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos de la fecha no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingDate =
            await getDateById(id);

        if (!existingDate) {
            return {
                success: false,
                error: "La fecha no existe.",
            };
        }

        const date = await updateDate(
            id,
            validation.data
        );

        return {
            success: true,
            data: date,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la fecha.",
        };
    }
}

export async function deleteDateAction(
    id: string
) {
    try {
        const existingDate =
            await getDateById(id);

        if (!existingDate) {
            return {
                success: false,
                error: "La fecha no existe.",
            };
        }

        await deleteDate(id);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la fecha.",
        };
    }
}