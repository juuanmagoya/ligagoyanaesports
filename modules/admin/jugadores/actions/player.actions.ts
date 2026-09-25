"use server";

import { revalidatePath } from "next/cache";

import {
  createPlayer,
  deletePlayer,
  updatePlayer,
} from "../services/player.service";

import { playerSchema } from "../schemas/player.schema";

export async function createPlayerAction(formData: FormData) {
  const validation = playerSchema.safeParse({
    steam_name: formData.get("steam_name"),
    team_id: formData.get("team_id"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  try {
    await createPlayer(validation.data);

    revalidatePath("/admin/Jugadores");

    return {
      success: true,
      message: "Jugador creado correctamente",
    };
  } catch (error) {
    console.error("Error al crear jugador:", error);

    return {
      success: false,
      message: "No se pudo crear el jugador",
    };
  }
}

export async function updatePlayerAction(
  id: string,
  formData: FormData
) {
  const validation = playerSchema.safeParse({
    steam_name: formData.get("steam_name"),
    team_id: formData.get("team_id"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  try {
    await updatePlayer(id, validation.data);

    revalidatePath("/admin/Jugadores");

    return {
      success: true,
      message: "Jugador actualizado correctamente",
    };
  } catch (error) {
    console.error("Error al actualizar jugador:", error);

    return {
      success: false,
      message: "No se pudo actualizar el jugador",
    };
  }
}

export async function deletePlayerAction(id: string) {
  if (!id) {
    return {
      success: false,
      message: "Jugador inválido",
    };
  }

  try {
    await deletePlayer(id);

    revalidatePath("/admin/Jugadores");

    return {
      success: true,
      message: "Jugador eliminado correctamente",
    };
  } catch (error) {
    console.error("Error al eliminar jugador:", error);

    return {
      success: false,
      message: "No se pudo eliminar el jugador",
    };
  }
}