import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ModifierKeyName, TriggerType } from "@/lib/types";

export * from "./dom";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncateWithEllipsis(s: string, maxLength: number): string {
    if (s.length > maxLength) {
        return s.slice(0, maxLength - 3) + "...";
    }
    return s;
}

export function safeParseJSON(s: string) {
    // TODO: refactor using zod
    try {
        return JSON.parse(s);
    } catch (err) {
        return null;
    }
}

export function safeTestRegexStr(regexStr: string, testStr: string): boolean {
    try {
        const regex = new RegExp(regexStr);
        return regex.test(testStr);
    } catch (err) {
        return false;
    }
}

export function satisfiesAllModifiers(e: KeyboardEvent | MouseEvent, modifiers: ModifierKeyName[]): boolean {
    for (const keyName of modifiers) {
        if (keyName === ModifierKeyName.Control) {
            if (!e.ctrlKey) return false;
        } else if (keyName === ModifierKeyName.Shift) {
            if (!e.shiftKey) return false;
        }
    }
    return true;
}

export function isKeyTriggerType(triggerType: TriggerType): boolean {
    if (triggerType === TriggerType.KEYPRESS
        || triggerType === TriggerType.KEYDOWN
        || triggerType === TriggerType.KEYUP
    ) {
        return true;
    }
    return false;
}
