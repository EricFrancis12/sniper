import React, { useState } from "react";
import "@/index.css";
import { useSyncState } from "@/hooks/use-sync-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Campaign, KeyName, TriggerType } from "@/lib/types";

export default function CampaignsPage() {
    const [triggerType, setTriggerType] = useState<TriggerType>(TriggerType.CLICK);
    const [campaigns, setCampaigns] = useSyncState<Campaign[]>([], "campaigns");

    function saveCampaigns() {
        setCampaigns([{
            urlRegex: "/.*/",
            triggers: [
                {
                    triggerType,
                    keyName: KeyName.A,
                    whilePressed: [KeyName.Shift],
                    selector: null,
                    maxMatches: null,
                    disabled: false,
                },
            ],
            handlers: [
                {
                    script: `alert("💉 A JavaScript Alert!");`,
                    disabled: false,
                },
                {
                    script: `console.log("Hello from handler.script");`,
                    disabled: false,
                },
            ],
            disabled: false,
        }]);
    }

    return (
        <main className="h-screen w-full p-4">
            <SidebarTrigger />
            <div className="flex flex-col items-center gap-2">
                <Select
                    value={triggerType}
                    onValueChange={(value) => setTriggerType(value as TriggerType)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(TriggerType).map((tt) => (
                            <SelectItem key={tt} value={tt}>
                                {tt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={saveCampaigns}>Save</Button>
            </div>
        </main>
    );
}
