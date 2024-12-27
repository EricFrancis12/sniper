import { TriggerType } from "./types";

export function testRegexStr(regexStr: string, testStr: string): boolean {
    try {
        const regex = new RegExp(regexStr);
        return regex.test(testStr);
    } catch (err) {
        console.error(err);
        return false;
    }
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
