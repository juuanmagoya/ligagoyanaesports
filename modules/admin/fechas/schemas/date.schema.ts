import { z } from "zod";

export const createDateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre de la fecha es obligatorio")
        .max(
            100,
            "El nombre de la fecha no puede superar los 100 caracteres"
        ),
});

export const updateDateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre de la fecha es obligatorio")
        .max(
            100,
            "El nombre de la fecha no puede superar los 100 caracteres"
        ),
});