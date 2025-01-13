import { useEffect, useState } from "react";

export function useSyncState<T>(initialState: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        chrome.storage.sync.get(
            { [key]: initialState },
            (items) => setState(items[key]),
        );
    }, []);

    function setNewState(value: React.SetStateAction<T>) {
        setState(value);
        chrome.storage.sync
            .set({ [key]: value })
            .catch(console.error);
    }

    return [state, setNewState];
}
