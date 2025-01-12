import { useSyncState } from "./use-sync-state";
import { Campaign } from "@/lib/types";

// TODO: refactor to useData(): SpiperData and <DataProvider />

export function useCampaigns() {
    return useSyncState<Campaign[]>([], "campaigns");
}
