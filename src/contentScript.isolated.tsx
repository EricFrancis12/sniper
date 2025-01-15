import { sniperDataSchema } from "./lib/schemas";
import { SniperData } from "./lib/types";

console.log("~ isolated 1");

window.addEventListener("load", () => {
    console.log("~ isolated 2");

    chrome.action.setBadgeText({ text: "456" });

    chrome.storage.sync.get(
        { campaigns: [] } satisfies SniperData,
        async (items) => {
            const { data, success } = await sniperDataSchema.spa(items);
            if (success) {
                window.postMessage(data, "*");
            }
        },
    );
});
