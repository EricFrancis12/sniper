import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TitleWrapper from "@/components/TitleWrapper";
import NullableInput from "@/components/nullable/NullableInput";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import TriggerEditor from "@/components/TriggerEditor";
import PlusButton from "@/components/PlusButton";
import TriggerItem from "./TriggerItem";
import HandlerItem from "./HandlerItem";
import { cn } from "@/lib/utils";
import { Campaign, Trigger, TriggerType, newTrigger, newHandler } from "@/lib/types";

type CampaignEditorType = "new" | "edit";

export default function CampaignEditor({ type, campaign, onChange = () => { }, onSaveIntent = () => { }, className }: {
    type: CampaignEditorType;
    campaign: Campaign;
    onChange: (c: Campaign) => void;
    onSaveIntent?: () => void;
    className?: string;
}) {
    const [WIPTrigger, setWIPTrigger] = useState<Trigger | null>(null);

    function handleSaveIntent() {
        if (WIPTrigger) {
            onChange({
                ...campaign,
                triggers: campaign.triggers.map((t) => t.id === WIPTrigger.id ? WIPTrigger : t),
            });
            setWIPTrigger(null);
        }
    }

    return (
        <Sheet open={!!WIPTrigger}>
            <SheetContent
                onCloseIntent={() => setWIPTrigger(null)}
                className="pt-12"
            >
                {WIPTrigger &&
                    <TriggerEditor
                        trigger={WIPTrigger}
                        onChange={setWIPTrigger}
                        onSaveIntent={handleSaveIntent}
                        onCloseIntent={() => setWIPTrigger(null)}
                    />
                }
            </SheetContent>
            <Card className={cn(className, "flex flex-col gap-2 p-2")}>
                <CardHeader>
                    <CardTitle>{type === "new" ? "Create New Campaign" : "Edit Campaign"}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 p-4">
                    <div className="flex justify-end items-center gap-2 w-full">
                        <span>{campaignDisabledTitle(campaign.disabled, type)}</span>
                        <Switch
                            checked={!campaign.disabled}
                            onCheckedChange={(disabled) => onChange({
                                ...campaign,
                                disabled: !disabled,
                            })}
                        />
                    </div>
                    <TitleWrapper title="Campaign name">
                        <Input
                            placeholder="Campaign name"
                            value={campaign.name}
                            onChange={(e) => onChange({
                                ...campaign,
                                name: e.target.value,
                            })}
                        />
                    </TitleWrapper>
                    <NullableInput
                        title="Url Regex"
                        nativeProps={{ placeholder: "Url Regex" }}
                        value={campaign.urlRegex}
                        onChange={(urlRegex) => onChange({
                            ...campaign,
                            urlRegex,
                        })}
                    />
                    <TitleWrapper
                        title="Triggers"
                        className="p-3 border border-black rounded"
                    >
                        {campaign.triggers.length === 0
                            ? <p className="font-bold italic">No Triggers...</p>
                            : campaign.triggers.map((trigger, i) => (
                                <TriggerItem
                                    key={i}
                                    trigger={trigger}
                                    onEditIntent={() => setWIPTrigger(structuredClone(trigger))}
                                    onDeleteIntent={() => onChange({
                                        ...campaign,
                                        triggers: campaign.triggers.filter(({ id }) => id !== trigger.id),
                                    })}
                                />
                            ))
                        }
                        <PlusButton
                            onClick={() => onChange({
                                ...campaign,
                                triggers: [...campaign.triggers, newTrigger(TriggerType.CLICK)],
                            })}
                        />
                    </TitleWrapper>
                    <TitleWrapper
                        title="Handlers"
                        className="p-3 border border-black rounded"
                    >
                        {campaign.handlers.length === 0
                            ? <p className="font-bold italic">No Handlers...</p>
                            : campaign.handlers.map((handler, i) => (
                                <HandlerItem
                                    key={i}
                                    handler={handler}
                                    onChange={(handler) => onChange({
                                        ...campaign,
                                        handlers: campaign.handlers.map((h) => h.id === handler.id ? handler : h),
                                    })}
                                    onDeleteIntent={() => onChange({
                                        ...campaign,
                                        handlers: campaign.handlers.filter(({ id }) => id !== handler.id),
                                    })}
                                />
                            ))
                        }
                        <PlusButton
                            onClick={() => onChange({
                                ...campaign,
                                handlers: [...campaign.handlers, newHandler()],
                            })}
                        />
                    </TitleWrapper>
                </CardContent>
                <CardFooter>
                    <Button onClick={onSaveIntent}>
                        {type === "new" ? "Create" : "Save"}
                    </Button>
                </CardFooter>
            </Card>
        </Sheet>
    );
}

function campaignDisabledTitle(disabled: boolean, type: CampaignEditorType): string {
    if (type === "new") {
        return disabled ? "Start with Campaign Off" : "Start with Campaign On";
    }
    return disabled ? "Campaign Off" : "Campaign On";
}
