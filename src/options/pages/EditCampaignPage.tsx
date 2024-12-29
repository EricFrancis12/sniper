import React from "react";
import { useParams } from "react-router-dom";
import CampaignEditor from "@/components/CampaignEditor";
import { useCampaigns } from "@/hooks/use-campaigns";

export default function EditCampaignPage() {
    const { campaignId } = useParams();
    const [campaigns] = useCampaigns();

    const campaign = campaigns.find(({ id }) => id === campaignId);

    return (
        <main className="h-screen w-full flex justify-center items-center">
            {campaign
                ? <CampaignEditor
                    type="new"
                    campaign={campaign}
                    onSave={() => console.log("save not yet implimented")}
                />
                : <p className="font-bold italic">Campaign not found...</p>
            }
        </main>
    );
}
