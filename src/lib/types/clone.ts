import { Trigger, Handler, Campaign } from ".";

export function cloneTrigger(trigger: Trigger): Trigger {
    return {
        ...trigger,
        id: crypto.randomUUID(),
    };
}

export function cloneHandler(handler: Handler): Handler {
    return {
        ...handler,
        id: crypto.randomUUID(),
    };
}

export function cloneCampaign(campaign: Campaign): Campaign {
    return {
        ...campaign,
        id: crypto.randomUUID(),
        triggers: campaign.triggers.map(cloneTrigger),
        handlers: campaign.handlers.map(cloneHandler),
    };
}

export function cloneCampaignWithName(campaign: Campaign, name: string): Campaign {
    return {
        ...cloneCampaign(campaign),
        name,
    };
}
