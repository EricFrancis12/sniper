import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Campaign, Handler, KeyName, ModifierKeyName, Trigger, TriggerType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function truncateWithEllipsis(s: string, maxLength: number): string {
    if (s.length > maxLength) {
        return s.slice(0, maxLength - 3) + "...";
    }
    return s;
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
    const scriptEle = document.createElement("script");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.textContent = code;

    scriptEle.onload = () => scriptEle.remove();
    document.documentElement.appendChild(scriptEle);
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

export function newCampaign({
    name = "",
    urlRegex = "/.*/", // matches any string
    triggers = [],
    handlers = [],
    disabled = false,
}: {
    name?: string;
    urlRegex?: string;
    triggers?: Trigger[];
    handlers?: Handler[];
    disabled?: boolean;
} = {}): Campaign {
    return {
        id: crypto.randomUUID(),
        name,
        urlRegex,
        triggers,
        handlers,
        disabled,
    };
}

export function newTrigger(
    triggerType: TriggerType,
    {
        keyName = null,
        whilePressed = [],
        selector = null,
        maxMatches = null,
        disabled = false,
    }: {
        keyName?: KeyName | null;
        whilePressed?: ModifierKeyName[];
        selector?: string | null;
        maxMatches?: number | null;
        disabled?: boolean;
    } = {}): Trigger {
    return {
        id: crypto.randomUUID(),
        triggerType,
        keyName,
        whilePressed,
        selector,
        maxMatches,
        disabled,
    };
}

export function newHandler({ script = "", disabled = false }: {
    script?: string;
    disabled?: boolean;
} = {}): Handler {
    return {
        id: crypto.randomUUID(),
        script,
        disabled,
    };
}
