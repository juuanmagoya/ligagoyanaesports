"use server";

import {
    createMatch,
    deleteMatch,
    getMatchById,
    updateMatch,
} from "../services/match.service";

import {
    createMatchSchema,
    updateMatchSchema,
} from "../schemas/match.schema";

export async function createMatchAction(
    formData: FormData
) {
    const dateId = formData.get("date_id");
    const teamAId = formData.get("team_a_id");
    const teamBId = formData.get("team_b_id");
    const scoreA = formData.get("score_a");
    const scoreB = formData.get("score_b");

    const validation = createMatchSchema.safeParse({
        date_id: dateId,
        team_a_id: teamAId,
        team_b_id: teamBId,
        score_a:
            scoreA !== null
                ? Number(scoreA)
                : undefined,
        score_b:
            scoreB !== null
                ? Number(scoreB)
                : undefined,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos del enfrentamiento no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const match = await createMatch(
            validation.data
        );

        return {
            success: true,
            data: match,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el enfrentamiento.",
        };
    }
}

export async function updateMatchAction(
    id: string,
    formData: FormData
) {
    const dateId = formData.get("date_id");
    const teamAId = formData.get("team_a_id");
    const teamBId = formData.get("team_b_id");
    const scoreA = formData.get("score_a");
    const scoreB = formData.get("score_b");

    const validation = updateMatchSchema.safeParse({
        date_id: dateId,
        team_a_id: teamAId,
        team_b_id: teamBId,
        score_a:
            scoreA !== null
                ? Number(scoreA)
                : undefined,
        score_b:
            scoreB !== null
                ? Number(scoreB)
                : undefined,
    });

    if (!validation.success) {
        return {
            success: false,
            error: "Los datos del enfrentamiento no son válidos.",
            fieldErrors:
                validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingMatch =
            await getMatchById(id);

        if (!existingMatch) {
            return {
                success: false,
                error: "El enfrentamiento no existe.",
            };
        }

        const match = await updateMatch(
            id,
            validation.data
        );

        return {
            success: true,
            data: match,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el enfrentamiento.",
        };
    }
}

export async function deleteMatchAction(
    id: string
) {
    try {
        const existingMatch =
            await getMatchById(id);

        if (!existingMatch) {
            return {
                success: false,
                error: "El enfrentamiento no existe.",
            };
        }

        await deleteMatch(id);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el enfrentamiento.",
        };
    }
}