import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CampaignEditor from "@/components/CampaignEditor";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Campaign } from "@/lib/types";

export default function EditCampaignPage() {
    const { campaignId } = useParams();
    const [campaigns, setCampaigns] = useCampaigns();
    const { toast } = useToast();

    const campaign = campaigns.find(({ id }) => id === campaignId) ?? null;
    const [WIPCampaign, setWIPCampaign] = useState<Campaign | null>(campaign);

    useEffect(() => setWIPCampaign(campaign), [campaign]);

    function handleSaveIntent() {
        if (WIPCampaign !== null) {
            setCampaigns(campaigns.filter((c) => c.id === WIPCampaign.id ? WIPCampaign : c));
            toast({ title: "Campaign Saved Successfully" });
        }
    }

    return (
        <main className="h-screen w-full flex justify-center items-center">
            <SidebarTrigger />
            {WIPCampaign
                ? <CampaignEditor
                    type="edit"
                    campaign={WIPCampaign}
                    onChange={setWIPCampaign}
                    onSaveIntent={handleSaveIntent}
                />
                : <p className="font-bold italic">Campaign not found...</p>
            }
        </main>
    );
}
