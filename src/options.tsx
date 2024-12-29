import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Campaign, KeyName, TriggerType } from "./lib/types";
import "./index.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Button } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

function Options() {
    const [triggerType, setTriggerType] = useState<TriggerType>(TriggerType.CLICK);
    const [status, setStatus] = useState("");

    function saveCampaigns() {
        chrome.storage.sync.set(
            {
                campaigns: [{
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
                } satisfies Campaign],
            },
            () => {
                setStatus("Campaigns saved.");
                const id = setTimeout(() => {
                    setStatus("");
                }, 1000);
                return () => clearTimeout(id);
            }
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
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
                    <div>{status}</div>
                </div>
            </main>
        </SidebarProvider>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);
