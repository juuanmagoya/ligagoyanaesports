import { z } from "zod";

export const createMatchSchema = z
    .object({
        date_id: z
            .string()
            .uuid("La fecha seleccionada no es válida"),

        team_a_id: z
            .string()
            .uuid("El equipo A seleccionado no es válido"),

        team_b_id: z
            .string()
            .uuid("El equipo B seleccionado no es válido"),

        score_a: z
            .number()
            .int("El resultado del equipo A debe ser un número entero")
            .min(
                0,
                "El resultado del equipo A no puede ser negativo"
            ),

        score_b: z
            .number()
            .int("El resultado del equipo B debe ser un número entero")
            .min(
                0,
                "El resultado del equipo B no puede ser negativo"
            ),
    })
    .refine(
        (data) => data.team_a_id !== data.team_b_id,
        {
            message:
                "Los equipos del enfrentamiento deben ser diferentes",
            path: ["team_b_id"],
        }
    );

export const updateMatchSchema = z
    .object({
        date_id: z
            .string()
            .uuid("La fecha seleccionada no es válida"),

        team_a_id: z
            .string()
            .uuid("El equipo A seleccionado no es válido"),

        team_b_id: z
            .string()
            .uuid("El equipo B seleccionado no es válido"),

        score_a: z
            .number()
            .int("El resultado del equipo A debe ser un número entero")
            .min(
                0,
                "El resultado del equipo A no puede ser negativo"
            ),

        score_b: z
            .number()
            .int("El resultado del equipo B debe ser un número entero")
            .min(
                0,
                "El resultado del equipo B no puede ser negativo"
            ),
    })
    .refine(
        (data) => data.team_a_id !== data.team_b_id,
        {
            message:
                "Los equipos del enfrentamiento deben ser diferentes",
            path: ["team_b_id"],
        }
    );