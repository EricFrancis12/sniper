import { useSyncState } from "./use-sync-state";
import { Campaign } from "@/lib/types";

export function useCampaigns() {
    return useSyncState<Campaign[]>([], "campaigns");
}
