import { z } from "zod";

export const playerSchema = z.object({
  steam_name: z
    .string()
    .min(2, "El nombre de Steam debe tener al menos 2 caracteres")
    .max(50, "El nombre de Steam no puede superar los 50 caracteres")
    .trim(),

  team_id: z
    .string()
    .uuid("Debes seleccionar un equipo válido"),
});

export type PlayerSchema = z.infer<typeof playerSchema>;