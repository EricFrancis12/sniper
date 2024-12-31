import { z } from "zod";

export function safeParseJSON(s: string): unknown | null {
    try {
        return JSON.parse(s);
    } catch (err) {
        return null;
    }
}

export async function safeSchemaParseJSON<T>(s: string, schema: z.ZodType<T>): Promise<T | null> {
    const { data, success } = await schema.spa(safeParseJSON(s));
    return success ? data : null;
}
