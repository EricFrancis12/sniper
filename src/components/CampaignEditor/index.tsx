import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TitleWrapper from "@/components/TitleWrapper";
import NullableInput from "@/components/nullable/NullableInput";
import { Campaign, Trigger, TriggerType } from "@/lib/types";
import { newTrigger, newHandler } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TriggerEditor from "@/components/TriggerEditor";
import PlusButton from "@/components/PlusButton";
import TriggerItem from "./TriggerItem";
import HandlerItem from "./HandlerItem";

export default function CampaignEditor({ type, campaign, onChange = () => { }, onSave = () => { } }: {
    type: "new" | "edit";
    campaign: Campaign;
    onChange: (c: Campaign) => void;
    onSave?: () => void;
}) {
    const [WIPTrigger, setWIPTrigger] = useState<Trigger | null>(null);

    function handleSheetOpen(open: boolean) {
        if (!open) setWIPTrigger(null);
    }

    return (
        <Sheet onOpenChange={handleSheetOpen}>
            <SheetContent>
                {WIPTrigger
                    ? <TriggerEditor
                        trigger={WIPTrigger}
                        onChange={setWIPTrigger}
                    />
                    : null
                }
            </SheetContent>
            <Card className="flex flex-col gap-2 p-2">
                <CardHeader>
                    <CardTitle>{type === "new" ? "Create New Campaign" : "Edit Campaign"}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 p-4">
                    <TitleWrapper title={campaign.disabled ? "Campaign Off" : "Campaign On"}>
                        <Switch
                            checked={!campaign.disabled}
                            onCheckedChange={(disabled) => onChange({
                                ...campaign,
                                disabled: !disabled,
                            })}
                        />
                    </TitleWrapper>
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
                    <TitleWrapper title="Url Regex">
                        <NullableInput
                            nativeProps={{ placeholder: "Url Regex" }}
                            value={campaign.urlRegex}
                            onChange={(urlRegex) => onChange({
                                ...campaign,
                                urlRegex,
                            })}
                        />
                    </TitleWrapper>
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
                                    onEdit={() => setWIPTrigger(structuredClone(trigger))}
                                    EditComponent={({ onClick }) => (
                                        <SheetTrigger onClick={onClick}>
                                            <Pencil className="cursor-pointer" />
                                        </SheetTrigger>
                                    )}
                                    onDelete={() => onChange({
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
                            ? <p className="font-bold italic">No handlers...</p>
                            : campaign.handlers.map((handler, i) => (
                                <HandlerItem
                                    key={i}
                                    handler={handler}
                                    onChange={(handler) => onChange({
                                        ...campaign,
                                        handlers: campaign.handlers.map((h) => h.id === handler.id ? handler : h),
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
                    <Button onClick={() => onSave()}>
                        {type === "new" ? "Create" : "Save"}
                    </Button>
                </CardFooter>
            </Card>
        </Sheet>
    );
}
