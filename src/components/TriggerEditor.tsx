import React from "react";
import { Trigger } from "@/lib/types";

export default function TriggerEditor({ trigger, onChange }: {
    trigger: Trigger;
    onChange: (t: Trigger) => void;
    onSave?: () => void;
}) {
    console.log(trigger.id);
    // TODO: ...
    return (
        <div>TriggerEditor</div>
    )
}
