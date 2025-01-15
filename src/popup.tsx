import React from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Button } from "@/components/ui/button";
import { useAppDisabler } from "@/hooks/use-app-disabler";

function Popup() {
    const [disabled, setDisabled] = useAppDisabler();

    return (
        <div className="text-center">
            <Button
                className="m-2"
                onClick={() => setDisabled((prev) => !prev)}
            >
                {disabled ? "Enable App" : "Disable App"}
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
