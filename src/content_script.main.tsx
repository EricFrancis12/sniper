import { doHandle } from "./handlers";
import { Campaign } from "./types";
import { isKeyTriggerType, testRegexStr, triggerTypeToEventName } from "./utils";

window.addEventListener("message", (e) => {
    const campaigns: Campaign[] = e.data.campaigns;

    campaigns
        .filter(({ disabled, handlers }) => !disabled && handlers.some(h => !h.disabled))
        .forEach(({ urlRegex, triggers, handlers }: Campaign) => {
            const isMatch = urlRegex === null
                ? false
                : typeof urlRegex === "string"
                    ? testRegexStr(urlRegex, window.location.href)
                    : urlRegex.some((ur) => testRegexStr(ur, window.location.href));

            if (!isMatch) return;

            const doHandles = () => handlers.forEach(doHandle);

            triggers
                .filter(({ disabled }) => !disabled)
                .forEach(({ triggerType, selector, maxMatches }) => {
                    const elas = selector
                        ? Array.from(document.querySelectorAll(selector))
                        : [document];

                    if (typeof maxMatches === "number") {
                        elas.splice(maxMatches);
                    }

                    elas.forEach((ela) => {
                        const eventName = triggerTypeToEventName(triggerType);
                        if (!eventName) {
                            doHandles();
                        } else if (isKeyTriggerType(triggerType)) {
                            document.addEventListener(eventName, doHandles);
                        } else {
                            ela.addEventListener(eventName, doHandles);
                        }
                    });
                });
        });
});
