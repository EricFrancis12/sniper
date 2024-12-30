import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CampaignEditor from "@/components/CampaignEditor";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/use-campaigns";
import { newCampaign } from "@/lib/utils";

export default function CreateCampaignPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [campaigns, setCampaigns] = useCampaigns();

    const [campaign, setCampaign] = useState(newCampaign());

    function handleSaveIntent() {
        setCampaigns([...campaigns, campaign]);
        setCampaign(newCampaign());
        toast({ title: "Campaign Created Successfully" });
        navigate(`/campaigns/${campaign.id}/edit`);
    }

    return (
        <main className="h-screen w-full flex justify-center items-center">
            <SidebarTrigger />
            <CampaignEditor
                type="new"
                campaign={campaign}
                onChange={setCampaign}
                onSaveIntent={handleSaveIntent}
            />
        </main>
    );
}
