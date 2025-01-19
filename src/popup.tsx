import React from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Button } from "@/components/ui/button";
import { AppMessage } from "./lib/types";

function Popup() {
    function toggleAppDisabled() {
        chrome.storage.sync.get(
            null,
            (items) => {
                if ("appDisabled" in items && typeof items.appDisabled === "boolean") {
                    const newAppDisabled = !items.appDisabled;
                    const appMessage: AppMessage = {
                        appMessageType: "TOGGLE_APP_DISABLED",
                        value: newAppDisabled,
                    };

                    chrome.runtime.sendMessage(appMessage);
                    chrome.storage.sync.set({ appDisabled: newAppDisabled })
                }
            },
        );
    }

    return (
        <div className="text-center">
            <Button
                className="m-2"
                onClick={toggleAppDisabled}
            >
                Toggle On/Off
            </Button>
            <Button
                className="m-2"
                onClick={() => chrome.storage.sync.clear()}
            >
                Clear Storage
            </Button>
            <Button
                className="m-2"
                onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL("options.html") })}
            >
                Options Page
            </Button>
        </div>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);
