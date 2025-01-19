import { AppMessage } from "@/lib/types";

// @omit
console.log("contentScript.isolated 1");

window.addEventListener("load", () => {
    // @omit
    console.log("contentScript.isolated 2");

    chrome.storage.sync.get(
        null,
        (items) => {
            if ("appDisabled" in items && typeof items.appDisabled === "boolean") {
                const appMessage: AppMessage = {
                    appMessageType: "TOGGLE_APP_DISABLED",
                    value: items.appDisabled,
                };
                chrome.runtime.sendMessage(appMessage);
                window.postMessage(appMessage, "*");
            }

            if ("campaigns" in items && Array.isArray(items.campaigns)) {
                const appMessage: AppMessage = {
                    appMessageType: "PROCESS_CAMPAIGNS",
                    campaigns: items.campaigns, // TODO: refactor to remove any type
                };
                window.postMessage(appMessage, "*");
            }
        },
    );
});
