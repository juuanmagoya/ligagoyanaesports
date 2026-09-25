import { z } from "zod";

export const createPositionSchema = z.object({
    team_id: z
        .string()
        .uuid("El equipo seleccionado no es válido"),

    matches_played: z
        .number()
        .int("Los partidos jugados deben ser un número entero")
        .min(0, "Los partidos jugados no pueden ser negativos")
        .optional(),

    matches_won: z
        .number()
        .int("Los partidos ganados deben ser un número entero")
        .min(0, "Los partidos ganados no pueden ser negativos")
        .optional(),

    matches_drawn: z
        .number()
        .int("Los partidos empatados deben ser un número entero")
        .min(0, "Los partidos empatados no pueden ser negativos")
        .optional(),

    matches_lost: z
        .number()
        .int("Los partidos perdidos deben ser un número entero")
        .min(0, "Los partidos perdidos no pueden ser negativos")
        .optional(),

    maps_won: z
        .number()
        .int("Los mapas ganados deben ser un número entero")
        .min(0, "Los mapas ganados no pueden ser negativos")
        .optional(),

    points: z
        .number()
        .int("Los puntos deben ser un número entero")
        .min(0, "Los puntos no pueden ser negativos")
        .optional(),
});

export const updatePositionSchema = z.object({
    team_id: z
        .string()
        .uuid("El equipo seleccionado no es válido")
        .optional(),

    matches_played: z
        .number()
        .int("Los partidos jugados deben ser un número entero")
        .min(0, "Los partidos jugados no pueden ser negativos")
        .optional(),

    matches_won: z
        .number()
        .int("Los partidos ganados deben ser un número entero")
        .min(0, "Los partidos ganados no pueden ser negativos")
        .optional(),

    matches_drawn: z
        .number()
        .int("Los partidos empatados deben ser un número entero")
        .min(0, "Los partidos empatados no pueden ser negativos")
        .optional(),

    matches_lost: z
        .number()
        .int("Los partidos perdidos deben ser un número entero")
        .min(0, "Los partidos perdidos no pueden ser negativos")
        .optional(),

    maps_won: z
        .number()
        .int("Los mapas ganados deben ser un número entero")
        .min(0, "Los mapas ganados no pueden ser negativos")
        .optional(),

    points: z
        .number()
        .int("Los puntos deben ser un número entero")
        .min(0, "Los puntos no pueden ser negativos")
        .optional(),
});