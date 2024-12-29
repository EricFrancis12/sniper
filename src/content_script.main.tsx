import { doHandle } from "./handlers";
import { isKeyTriggerType, safeTestRegexStr, triggerTypeToEventName } from "./utils";
import { Campaign, TriggerType } from "./types";

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
            triggers
                .filter(({ disabled }) => !disabled)
                .forEach(({ triggerType, keyName, selector, maxMatches }) => {
                    const elas = selector
                        ? Array.from(document.querySelectorAll(selector))
                        : [document];

                    if (typeof maxMatches === "number") {
                        elas.splice(maxMatches);
                    }

                    const doHandles = (e?: Event) => {
                        // TODO: add app disabled state,
                        // and check if disabled here

                        const keyboardEvent = toKeyboardEvent(e);
                        if (keyboardEvent
                            && keyName
                            && isKeyTriggerType(triggerType)
                            && keyboardEvent.key.toLowerCase() !== keyName.toLowerCase()
                        ) {
                            return;
                        }

                        handlers.forEach(doHandle);
                    };

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

function toKeyboardEvent(u: unknown): KeyboardEvent | null {
    if (u instanceof KeyboardEvent) {
        return u;
    }
    return null;
}
