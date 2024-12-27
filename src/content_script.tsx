import { doHandle } from "./handlers";
import { Campaign } from "./types";
import { testRegexStr, triggerTypeToEventName } from "./utils";

interface EventListenerAdder {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
}

window.addEventListener("load", () => {
    chrome.storage.sync.get(
        {
            campaigns: [],
        },
        ({ campaigns }) => {
            campaigns.forEach(({ urlRegex, triggers, handlerNames }: Campaign) => {
                const isMatch = typeof urlRegex === "string"
                    ? testRegexStr(urlRegex, window.location.href)
                    : urlRegex.some((ur) => testRegexStr(ur, window.location.href));

                if (!isMatch) return;

                triggers.forEach((trigger) => {
                    const doHandles = (e: Event | null) => {
                        handlerNames.forEach((hn) => doHandle(hn, {
                            trigger,
                            nativeEvent: e,
                        }));
                    };

                    const { triggerType, selector, maxMatches } = trigger;

                    const elas: EventListenerAdder[] = selector
                        ? Array.from(document.querySelectorAll(selector))
                        : [document];

                    if (typeof maxMatches === "number") {
                        elas.splice(maxMatches);
                    }

                    elas.forEach((ela) => {
                        const eventName = triggerTypeToEventName(triggerType);
                        if (eventName) {
                            ela.addEventListener(eventName, doHandles);
                        } else {
                            doHandles(null);
                        }
                    });
                });
            });
        },
    );
});
