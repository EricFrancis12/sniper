import React, { useState } from "react";
import { Info, Pencil, Plus, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TitleWrapper from "./TitleWrapper";
import NullableInput from "./nullable/NullableInput";
import { Campaign, Handler, Trigger, TriggerType } from "@/lib/types";
import { cn, truncateWithEllipsis, isKeyTriggerType, newTrigger, newHandler } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import TriggerEditor from "./TriggerEditor";

function PlusButton({ onClick, className }: {
    onClick: () => void;
    className?: string;
}) {
    return (
        <Plus
            className={cn(className, "mx-2 cursor-pointer hover:opacity-70")}
            onClick={onClick}
        />
    );
}

function TriggerItem({ trigger, onEdit, onDelete, EditComponent, DeleteComponent }: {
    trigger: Trigger;
    onEdit?: () => void;
    onDelete?: () => void;
    EditComponent?: React.FC<{ onClick?: () => void; }>;
    DeleteComponent?: React.FC<{ onClick?: () => void; }>;
}) {
    const { triggerType, keyName, whilePressed, selector, maxMatches, disabled } = trigger;

    return (
        <div className="flex items-center gap-2 p-2 bg-slate-200 rounded-full">
            <HoverCard>
                <HoverCardTrigger><Info /></HoverCardTrigger>
                <HoverCardContent>
                    <p>Trigger Type: {triggerType}</p>
                    {isKeyTriggerType(triggerType) && <p>Type: {keyName}</p>}
                    <p>
                        While Pressing:
                        {whilePressed.length === 0
                            ? " none"
                            : whilePressed.map((k, i) => (
                                <span key={i} className="p-1 bg-slate-300 rounded-full">{k}</span>
                            ))
                        }
                    </p>
                    <p>Selector: {selector || "none"}</p>
                    {maxMatches !== null && <p>{maxMatches}</p>}
                    <p>Disabled: {`${disabled}`}</p>
                </HoverCardContent>
            </HoverCard>
            {EditComponent
                ? <EditComponent onClick={onEdit} />
                : <Pencil onClick={onEdit} className="cursor-pointer" />}
            {DeleteComponent
                ? <DeleteComponent onClick={onDelete} />
                : <TrashIcon onClick={onDelete} className="cursor-pointer" />
            }
        </div>
    );
}

function HandlerItem({ handler, onChange }: {
    handler: Handler;
    onChange: (h: Handler) => void;
}) {
    return (
        <div className="flex items-center gap-2 p-2 bg-slate-200 rounded-full">
            <Popover>
                <PopoverTrigger><Pencil /></PopoverTrigger>
                <PopoverContent>
                    <Switch
                        checked={!handler.disabled}
                        onCheckedChange={(disabled) => onChange({
                            ...handler,
                            disabled: !disabled,
                        })}
                    />
                    {/* TODO: add code editor */}
                    <textarea
                        value={handler.script}
                        onChange={e => onChange({
                            ...handler,
                            script: e.target.value,
                        })}
                    />
                </PopoverContent>
            </Popover>
            <p className="whitespace-nowrap">{truncateWithEllipsis(handler.script, 50)}</p>
        </div>
    );
}

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