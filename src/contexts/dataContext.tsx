import React, { useContext } from "react";
import { Campaign, newSniperData, SniperData } from "@/lib/types";
import { useSyncState } from "@/hooks/use-sync-state";

export type DataContext = {
    sniperData: SniperData;
    setSniperData: React.Dispatch<React.SetStateAction<SniperData>>;
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
    const [sniperData, setSniperData] = useSyncState<SniperData>(newSniperData(), "sniper-data");

    function setCampaigns(newCampaigns: Campaign[]) {
        setSniperData({ ...sniperData, campaigns: newCampaigns });
    }

    const value: DataContext = {
        sniperData,
        setSniperData,
        campaigns: sniperData.campaigns,
        setCampaigns,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider >
    )
}
