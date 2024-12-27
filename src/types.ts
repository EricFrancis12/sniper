export enum TriggerType {
    // mouse
    CLICK = "CLICK",
    MOUSEDOWN = "MOUSEDOWN",
    MOUSEUP = "MOUSEUP",
    MOUSEOVER = "MOUSEOVER",
    MOUSEENTER = "MOUSEENTER",
    MOUSELEAVE = "MOUSELEAVE",

    // keyboard
    KEYPRESS = "KEYPRESS",
    KEYDOWN = "KEYDOWN",
    KEYUP = "KEYUP",

    // load
    PAGE_LOAD = "PAGE_LOAD",
}

export type Trigger = {
    triggerType: TriggerType;
    selector: string | null;
    maxMatches: number | null;
    disabled: boolean;
};

export type ActionEvent = {
    trigger: Trigger;
    nativeEvent: Event | null;
};

export enum HandlerName {
    LOG = "LOG",
}

export type Handler = (actionEvent: ActionEvent) => void;

export type Campaign = {
    urlRegex: string | string[];
    triggers: Trigger[];
    handlerNames: HandlerName[];
    disabled: boolean;
};
