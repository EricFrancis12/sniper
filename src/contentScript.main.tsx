import { doHandle } from "./lib/handlers";
import { isKeyTriggerType, safeTestRegexStr, satisfiesAllModifiers } from "./lib/utils";
import { sniperDataSchema } from "./lib/schemas";
import { Campaign, toKeyboardEvent, triggerTypeToEventName } from "./lib/types";

window.addEventListener("message", async (e) => {
    const { data, success } = await sniperDataSchema.spa(e.data);
    if (!success) return;

    data.campaigns
        .filter(({ urlRegex, handlers, disabled }) => {
            const urlIsMatch = urlRegex === null
                ? false
                : safeTestRegexStr(urlRegex, window.location.href);

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
                        // TODO: add app disabled state, and check if disabled here

                        // Handle if keyboard event
                        const keyboardEvent = toKeyboardEvent(e);

                        if (keyboardEvent
                            && keyName
                            && isKeyTriggerType(triggerType)
                            && keyboardEvent.code.toLowerCase() !== keyName.toLowerCase()
                        ) {
                            return;
                        }

                        // Check if all trigger.whilePressed keys were pressed
                        if (e && "code" in e && !satisfiesAllModifiers(e, whilePressed)) {
                            return;
                        }

                        // TODO: add ability to specify preventDefault at the trigger level,
                        // and if true, call e.?preventDefault() here.

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