import { useSyncState } from "@/hooks/use-sync-state";
import { useEffect } from "react";

export function useAppDisabler(): ReturnType<typeof useSyncState<boolean>> {
    const [disabled, setDisabled] = useSyncState(false, "disabled");

    useEffect(() => {
        console.log("sending messages in useEffect");
        chrome.runtime.sendMessage(
            disabled,
            (msg) => {
                console.log("result message:", msg);
            },
        );
        window.postMessage(String(disabled), "*");
        console.log("messages sent in useEffect");
    }, [disabled]);

    return [disabled, setDisabled];
}
