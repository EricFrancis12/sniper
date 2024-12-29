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
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",

    // Numbers
    Zero = "0",
    One = "1",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",

    // Special
    Alt = "Alt",
    Control = "Control",
    Shift = "Shift",
}

export type ModifierKeyName = KeyName.Alt | KeyName.Control | KeyName.Shift;

export type Trigger = {
    triggerType: TriggerType;
    keyName: KeyName | null;
    whilePressed: ModifierKeyName[];
    selector: string | null;
    maxMatches: number | null;
    disabled: boolean;
};

export type Handler = {
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
