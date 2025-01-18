console.log("~ isolated 1");

window.addEventListener("load", () => {
    console.log("~ isolated 2");

    chrome.storage.sync.get(
        {
            campaigns: [],
            disabled: false,
        },
        (items) => {
            console.log(items);
            if ("campaigns" in items) {
                window.postMessage({ campaigns: items.campaigns }, "*");
            }
            if ("disabled" in items && (items.disabled === "true" || items.disabled === "false")) {
                console.log("here");
                chrome.runtime.sendMessage(items.disabled);
            }
        },
    );
});
