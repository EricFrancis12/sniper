import { sniperDataSchema } from "./lib/schemas";
import { SniperData } from "./lib/types";

window.addEventListener("load", () => {
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
