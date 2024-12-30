window.addEventListener("load", () => {
    // TODO: Use zod to check for correct Campaign type
    chrome.storage.sync.get(
        { campaigns: [] },
        ({ campaigns }) => window.postMessage({ campaigns }, "*"),
    );
});
