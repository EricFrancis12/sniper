import { Trigger, Handler, Campaign, TriggerType, KeyName, ModifierKeyName, SniperData } from ".";

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

export function newSniperData(): SniperData {
    return {
        campaigns: [],
    };
}
