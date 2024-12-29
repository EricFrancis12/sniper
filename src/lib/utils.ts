import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { KeyName, ModifierKeyName, TriggerType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function safeParseJSON(s: string) {
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

export function injectJSCode(code: string) {
    const scriptElement = document.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.textContent = code;
    document.documentElement.appendChild(scriptElement);

    setTimeout(() => scriptElement.remove(), 0);
}

export function satisfiesAllModifiers(e: KeyboardEvent | MouseEvent, modifiers: ModifierKeyName[]): boolean {
    for (const keyName of modifiers) {
        if (keyName === KeyName.Alt) {
            if (!e.altKey) return false;
        } else if (keyName === KeyName.Control) {
            if (!e.ctrlKey) return false;
        } else if (keyName === KeyName.Shift) {
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

export function triggerTypeToEventName(triggerType: TriggerType): keyof WindowEventMap | null {
    switch (triggerType) {
        case TriggerType.CLICK: return "click";
        case TriggerType.MOUSEDOWN: return "mousedown";
        case TriggerType.MOUSEUP: return "mouseup";
        case TriggerType.MOUSEOVER: return "mouseover";
        case TriggerType.MOUSEENTER: return "mouseenter";
        case TriggerType.MOUSELEAVE: return "mouseleave";
        case TriggerType.KEYPRESS: return "keypress";
        case TriggerType.KEYDOWN: return "keydown";
        case TriggerType.KEYUP: return "keyup";
        case TriggerType.PAGE_LOAD: return null;
    }
}

export function toKeyboardEvent(u: unknown): KeyboardEvent | null {
    if (u instanceof KeyboardEvent) {
        return u;
    }
    return null;
}
