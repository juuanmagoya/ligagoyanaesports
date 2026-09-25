import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "ligagoyana";

const ALLOWED_FILE_TYPE = "image/webp";

// Máximo 2 Megabytes
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

function getTeamLogoPath(teamId: string): string {
    return `teams/${teamId}/logo`;
}

function validateLogoFile(file: File): void {
    if (file.type !== ALLOWED_FILE_TYPE) {
        throw new Error(
            "El logo debe estar en formato WebP."
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error(
            "El logo no puede superar los 2 MB."
        );
    }

    if (file.size === 0) {
        throw new Error(
            "El archivo del logo está vacío."
        );
    }
}

export async function uploadTeamLogo(
    file: File,
    teamId: string
): Promise<string> {
    validateLogoFile(file);

    const supabase = await createClient();

    const filePath = getTeamLogoPath(teamId);

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
            upsert: true,
            contentType: "image/webp",
        });

    if (error) {

        throw new Error(
            `No se pudo subir el logo: ${error.message}`
        );
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrl;
}

export async function deleteTeamLogo(
    teamId: string
): Promise<void> {
    const supabase = await createClient();

    const filePath = getTeamLogoPath(teamId);

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

    if (error) {
        throw new Error(
            `No se pudo eliminar el logo: ${error.message}`
        );
    }
}