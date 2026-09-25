"use server";

import {
    createPosition,
    deletePosition,
    getPositionById,
    updatePosition,
} from "@/modules/admin/posiciones/services/positions.service";

import {
    createPositionSchema,
    updatePositionSchema,
} from "@/modules/admin/posiciones/schemas/positions.schema";

export async function createPositionAction(
    formData: FormData
) {
    const teamId = formData.get("team_id");
    const matchesPlayed = formData.get("matches_played");
    const matchesWon = formData.get("matches_won");
    const matchesDrawn = formData.get("matches_drawn");
    const matchesLost = formData.get("matches_lost");
    const mapsWon = formData.get("maps_won");
    const points = formData.get("points");

    const validation = createPositionSchema.safeParse({
        team_id: teamId,
        matches_played:
            matchesPlayed !== null
                ? Number(matchesPlayed)
                : undefined,
        matches_won:
            matchesWon !== null
                ? Number(matchesWon)
                : undefined,
        matches_drawn:
            matchesDrawn !== null
                ? Number(matchesDrawn)
                : undefined,
        matches_lost:
            matchesLost !== null
                ? Number(matchesLost)
                : undefined,
        maps_won:
            mapsWon !== null
                ? Number(mapsWon)
                : undefined,
        points:
            points !== null
                ? Number(points)
                : undefined,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos de la posición no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const position = await createPosition(
            validation.data
        );

        return {
            success: true,
            data: position,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear la posición.",
        };
    }
}

export async function updatePositionAction(
    id: string,
    formData: FormData
) {
    const teamId = formData.get("team_id");
    const matchesPlayed = formData.get("matches_played");
    const matchesWon = formData.get("matches_won");
    const matchesDrawn = formData.get("matches_drawn");
    const matchesLost = formData.get("matches_lost");
    const mapsWon = formData.get("maps_won");
    const points = formData.get("points");

    const validation = updatePositionSchema.safeParse({
        team_id:
            teamId !== null
                ? teamId
                : undefined,

        matches_played:
            matchesPlayed !== null
                ? Number(matchesPlayed)
                : undefined,

        matches_won:
            matchesWon !== null
                ? Number(matchesWon)
                : undefined,

        matches_drawn:
            matchesDrawn !== null
                ? Number(matchesDrawn)
                : undefined,

        matches_lost:
            matchesLost !== null
                ? Number(matchesLost)
                : undefined,

        maps_won:
            mapsWon !== null
                ? Number(mapsWon)
                : undefined,

        points:
            points !== null
                ? Number(points)
                : undefined,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos de la posición no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingPosition =
            await getPositionById(id);

        if (!existingPosition) {
            return {
                success: false,
                error: "La posición no existe.",
            };
        }

        const position = await updatePosition(
            id,
            validation.data
        );

        return {
            success: true,
            data: position,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la posición.",
        };
    }
}

export async function deletePositionAction(
    id: string
) {
    try {
        const existingPosition =
            await getPositionById(id);

        if (!existingPosition) {
            return {
                success: false,
                error: "La posición no existe.",
            };
        }

        await deletePosition(id);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la posición.",
        };
    }
}