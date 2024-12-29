import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function Popup() {
    return (
        <>
            <button onClick={() => chrome.storage.sync.clear()}>
                Clear Storage
            </button>
            <button onClick={() => chrome.runtime.openOptionsPage()}>
                Options
            </button>
        </>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);
