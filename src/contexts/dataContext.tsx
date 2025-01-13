import React, { useContext } from "react";
import { useSyncState } from "@/hooks/use-sync-state";
import { Campaign } from "@/lib/types";

export type DataContext = {
    campaigns: Campaign[];
    setCampaigns: (c: Campaign[]) => void;
};

const DataContext = React.createContext<DataContext | null>(null);

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataContext provider");
    }
    return context;
}

export function DataProvider({ children }: {
    children: React.ReactNode;
}) {
    const [campaigns, setCampaigns] = useSyncState<Campaign[]>([], "campaigns");

    const value: DataContext = {
        campaigns,
        setCampaigns,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider >
    )
}
