import { doHandle } from "./handlers";
import { isKeyTriggerType, safeTestRegexStr, triggerTypeToEventName } from "./utils";
import { Campaign } from "./types";

window.addEventListener("message", (e) => {
    const campaigns: Campaign[] = e.data.campaigns;

    campaigns
        .filter(({ urlRegex, handlers, disabled }) => {
            const urlIsMatch = urlRegex === null
                ? false
                : typeof urlRegex === "string"
                    ? safeTestRegexStr(urlRegex, window.location.href)
                    : urlRegex.some((ur) => safeTestRegexStr(ur, window.location.href));

            return urlIsMatch
                && handlers.some(h => !h.disabled)
                && !disabled;
        })
        .forEach(({ triggers, handlers }: Campaign) => {
            const doHandles = () => {
                // TODO: add app disabled state,
                // and check if disabled here
                handlers.forEach(doHandle);
            };

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
