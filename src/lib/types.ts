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

// TODO: enumerate all keys
export enum KeyName {
    // Letters
    A = "KeyA",
    B = "KeyB",
    C = "KeyC",
    D = "KeyD",
    E = "KeyE",
    F = "KeyF",
    G = "KeyG",
    H = "KeyH",
    I = "KeyI",
    J = "KeyJ",
    K = "KeyK",
    L = "KeyL",
    M = "KeyM",
    N = "KeyN",
    O = "KeyO",
    P = "KeyP",
    Q = "KeyQ",
    R = "KeyR",
    S = "KeyS",
    T = "KeyT",
    U = "KeyU",
    V = "KeyV",
    W = "KeyW",
    X = "KeyX",
    Y = "KeyY",
    Z = "KeyZ",

    // Numbers
    Zero = "Digit0",
    One = "Digit1",
    Two = "Digit2",
    Three = "Digit3",
    Four = "Digit4",
    Five = "Digit5",
    Six = "Digit6",
    Seven = "Digit7",
    Eight = "Digit8",
    Nine = "Digit9",
}

export enum ModifierKeyName {
    Control = "Control",
    Shift = "Shift",
}

export type Trigger = {
    id: string;
    triggerType: TriggerType;
    keyName: KeyName | null;
    whilePressed: ModifierKeyName[];
    selector: string | null;
    maxMatches: number | null;
    disabled: boolean;
};

export type Handler = {
    id: string;
    script: string;
    disabled: boolean;
};

export type Campaign = {
    id: string;
    name: string;
    urlRegex: string | null;
    triggers: Trigger[];
    handlers: Handler[];
    disabled: boolean;
};

export type SniperData = {
    campaigns: Campaign[];
};
