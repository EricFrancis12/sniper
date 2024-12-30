import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CampaignEditor from "@/components/CampaignEditor";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Campaign } from "@/lib/types";

export default function EditCampaignPage() {
    const { campaignId } = useParams();
    const [campaigns] = useCampaigns();

    const campaign = campaigns.find(({ id }) => id === campaignId) ?? null;
    const [WIPCampaign, setWIPCampaign] = useState<Campaign | null>(campaign);

    return (
        <main className="h-screen w-full flex justify-center items-center">
            {WIPCampaign
                ? <CampaignEditor
                    type="new"
                    campaign={WIPCampaign}
                    onChange={setWIPCampaign}
                    onSave={() => console.log("save not yet implimented")}
                />
                : <p className="font-bold italic">Campaign not found...</p>
            }
        </main>
    );
}
