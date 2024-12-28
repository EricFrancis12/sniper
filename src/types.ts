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

export type Handler = {
    script: string;
    disabled: boolean;
};

export type Campaign = {
    urlRegex: string | string[] | null;
    triggers: Trigger[];
    handlers: Handler[];
    disabled: boolean;
};
