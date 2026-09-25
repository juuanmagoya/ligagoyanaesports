import { z } from "zod";

export const createTeamSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre no puede superar los 100 caracteres")
        .trim(),

    logo_url: z
        .string()
        .url("La URL del logo no es válida")
        .nullable()
        .optional(),
});

export const updateTeamSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre no puede superar los 100 caracteres")
        .trim(),

    logo_url: z
        .string()
        .url("La URL del logo no es válida")
        .nullable()
        .optional(),
});