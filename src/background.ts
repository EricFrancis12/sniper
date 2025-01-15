chrome.storage.sync.get(
    { disabled: false },
    (items) => {
        console.log("B");

        if ("disabled" in items && typeof items.disabled === "boolean") {
            // chrome.action.setBadgeText({ text: items.disabled ? "off" : "on" });
        }
    },
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("background.ts received message", msg, sender);

    if (typeof msg === "boolean") {
        // chrome.action.setBadgeText({ text: msg ? "off" : "on" });
    }

    sendResponse("cool");
});

console.log("A");
