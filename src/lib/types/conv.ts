import { TriggerType, EventName } from ".";

export function triggerTypeToEventName(triggerType: TriggerType): EventName | null {
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
