import { appMessageSchema } from "@/lib/schemas";

chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
    const { data, success } = await appMessageSchema.spa(message);
    if (!success) return;

    if (data.appMessageType === "TOGGLE_APP_DISABLED") {
        chrome.action.setBadgeText({ text: data.value ? "off" : "on" });
    }
});
