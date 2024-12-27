export enum TriggerType {
    // mouse
    CLICK = "click",
    MOUSEDOWN = "mousedown",
    MOUSEUP = "mouseup",
    MOUSEOVER = "mouseover",
    MOUSEENTER = "mouseenter",
    MOUSEEXIT = "mouseexit",

    // keyboard
    KEYPRESS = "keypress",
    KEYDOWN = "keydown",
    KEYUP = "keyup",

    // load
    PAGE_LOAD = "page_load",
}

export type Trigger = {
    triggerType: TriggerType;
    selector: string | null;
    maxMatches: number | null;
};

export type ActionEvent = {
    trigger: Trigger;
    nativeEvent: Event | null;
};

export enum HandlerName {
    CHANGE_BACKGROUND_COLOR = "CHANGE_BACKGROUND_COLOR",
}

export type Handler = (actionEvent: ActionEvent) => void;

export type Campaign = {
    urlRegex: string | string[];
    triggers: Trigger[];
    handlerNames: HandlerName[];
};
