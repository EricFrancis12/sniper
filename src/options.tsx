import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Campaign, HandlerName, TriggerType } from "./types";

function Options() {
    const [status, setStatus] = useState("");

    function saveCampaigns() {
        chrome.storage.sync.set(
            {
                campaigns: [{
                    urlRegex: "/.*/",
                    triggers: [
                        {
                            triggerType: TriggerType.PAGE_LOAD,
                            selector: null,
                            maxMatches: null,
                        },
                    ],
                    handlerNames: [
                        HandlerName.CHANGE_BACKGROUND_COLOR,
                    ],
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
            <div>{status}</div>
            <button onClick={saveCampaigns}>Save</button>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);
