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

export function triggerTypeToEventName(triggerType: TriggerType): keyof WindowEventMap | null {
    switch (triggerType) {
        case TriggerType.CLICK:
        case TriggerType.MOUSEDOWN:
        case TriggerType.MOUSEUP:
        case TriggerType.MOUSEOVER:
        case TriggerType.MOUSEENTER:
        case TriggerType.MOUSEEXIT:
        case TriggerType.KEYPRESS:
        case TriggerType.KEYDOWN:
        case TriggerType.KEYUP:
            return triggerType as keyof WindowEventMap;
        case TriggerType.PAGE_LOAD:
            return null;
    }
}
