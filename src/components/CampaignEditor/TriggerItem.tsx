import React from "react";
import { Info, Pencil, TrashIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Trigger } from "@/lib/types";
import { isKeyTriggerType } from "@/lib/utils";

export default function TriggerItem({ trigger, onEditIntent, onDeleteIntent }: {
    trigger: Trigger;
    onEditIntent?: () => void;
    onDeleteIntent?: () => void;
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
            <Pencil onClick={onEditIntent} className="cursor-pointer" />
            <TrashIcon onClick={onDeleteIntent} className="cursor-pointer" />
        </div>
    );
}
