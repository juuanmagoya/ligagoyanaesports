import { createClient } from "@/lib/supabase/server";

import type {
    CreateDateData,
    Date,
    UpdateDateData,
} from "../types/dates.types";

export async function getDates(): Promise<Date[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("dates")
        .select("*")
        .order("created_at", {
            ascending: true,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data as Date[];
}

export async function getDateById(
    id: string
): Promise<Date | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("dates")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as Date | null;
}

export async function createDate(
    dateData: CreateDateData
): Promise<Date> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("dates")
        .insert(dateData)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Date;
}

export async function updateDate(
    id: string,
    dateData: UpdateDateData
): Promise<Date> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("dates")
        .update(dateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Date;
}

export async function deleteDate(
    id: string
): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("dates")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}