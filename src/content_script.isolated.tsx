window.addEventListener("load", () => {
    chrome.storage.sync.get(
        {
            campaigns: [],
        },
        ({ campaigns }) => window.postMessage({ campaigns }, "*"),
    );
});
