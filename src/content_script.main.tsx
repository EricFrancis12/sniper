import { doHandle } from "./lib/handlers";
import {
    isKeyTriggerType, safeTestRegexStr, satisfiesAllModifiers,
    toKeyboardEvent, triggerTypeToEventName
} from "./lib/utils";
import { Campaign } from "./lib/types";

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
                .forEach(({ triggerType, keyName, whilePressed, selector, maxMatches }) => {
                    const elas = selector
                        ? Array.from(document.querySelectorAll(selector))
                        : [document];

                    if (typeof maxMatches === "number") {
                        elas.splice(maxMatches);
                    }

                    const doHandles = (e?: Event | KeyboardEvent | MouseEvent) => {
                        // TODO: add app disabled state,
                        // and check if disabled here

                        // Handle if keyboard event
                        const keyboardEvent = toKeyboardEvent(e);
                        if (keyboardEvent
                            && keyName
                            && isKeyTriggerType(triggerType)
                            && keyboardEvent.key.toLowerCase() !== keyName.toLowerCase()
                        ) {
                            return;
                        }

                        // Check if all trigger.whilePressed keys were pressed
                        if (e && "key" in e && !satisfiesAllModifiers(e, whilePressed)) {
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
