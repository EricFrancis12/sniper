import { z } from "zod";
import {
    Trigger, Handler, Campaign, TriggerType,
    KeyName, ModifierKeyName, SniperData
} from "./types";

export const triggerSchema: z.ZodType<Trigger> = z.object({
    id: z.string(),
    triggerType: z.nativeEnum(TriggerType),
    keyName: z.union([z.nativeEnum(KeyName), z.null()]),
    whilePressed: z.array(z.nativeEnum(ModifierKeyName)),
    selector: z.string().nullable(),
    maxMatches: z.number().nullable(),
    disabled: z.boolean()
});

export const handlerSchema: z.ZodType<Handler> = z.object({
    id: z.string(),
    script: z.string(),
    disabled: z.boolean(),
});

export const campaignSchema: z.ZodType<Campaign> = z.object({
    id: z.string(),
    name: z.string(),
    urlRegex: z.string().nullable(),
    triggers: z.array(triggerSchema),
    handlers: z.array(handlerSchema),
    disabled: z.boolean(),
});

export const sniperDataSchema: z.ZodType<SniperData> = z.object({
    campaigns: z.array(campaignSchema),
});
