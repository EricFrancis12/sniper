import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function Popup() {
    function pingContentScript() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.id) {
                chrome.tabs.sendMessage(
                    tab.id,
                    "Hello from popup.tsx",
                    (msg) => console.log(`Response received from content_script.tsx: ${msg}`),
                );
            }
        });
    }

    return (
        <>
            <button onClick={pingContentScript}>
                Ping Content Script
            </button>
            <button onClick={() => chrome.runtime.openOptionsPage()}>
                Options
            </button>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);
