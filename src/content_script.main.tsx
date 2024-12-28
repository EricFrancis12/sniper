import { doHandle } from "./handlers";
import { Campaign } from "./types";
import { isKeyTriggerType, testRegexStr, triggerTypeToEventName } from "./utils";

window.addEventListener('message', (e) => {
    const campaigns: Campaign[] = e.data.campaigns;

    campaigns.forEach(({ urlRegex, triggers, handlerNames, disabled }: Campaign) => {
        if (disabled) return;

        const isMatch = urlRegex === null
            ? false
            : typeof urlRegex === "string"
                ? testRegexStr(urlRegex, window.location.href)
                : urlRegex.some((ur) => testRegexStr(ur, window.location.href));

        if (!isMatch) return;

        triggers.forEach((trigger) => {
            const { triggerType, selector, maxMatches, disabled } = trigger;
            if (disabled) return;

            const doHandles = (e: Event | null) => {
                handlerNames.forEach((hn) => doHandle(hn, {
                    trigger,
                    nativeEvent: e,
                }));
            };

            const elas = selector
                ? Array.from(document.querySelectorAll(selector))
                : [document];

            if (typeof maxMatches === "number") {
                elas.splice(maxMatches);
            }

            elas.forEach((ela) => {
                const eventName = triggerTypeToEventName(triggerType);
                if (!eventName) {
                    doHandles(null);
                } else if (isKeyTriggerType(triggerType)) {
                    document.addEventListener(eventName, doHandles);
                } else {
                    ela.addEventListener(eventName, doHandles);
                }
            });
        });
    });
});
