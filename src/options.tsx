import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Campaign, TriggerType } from "./types";

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
        <>
            <select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value as TriggerType)}
            >
                {Object.values(TriggerType).map((tt) => (
                    <option key={tt} value={tt}>
                        {tt}
                    </option>
                ))}
            </select>
            <button onClick={saveCampaigns}>Save</button>
            <div>{status}</div>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);
