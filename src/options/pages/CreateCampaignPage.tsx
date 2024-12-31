import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignEditor from "@/components/CampaignEditor";
import PageMain from "../PageMain";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/use-campaigns";
import { newCampaign } from "@/lib/types";

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
        <PageMain className="flex flex-col">
            <Link to="/campaigns">
                <Button><ArrowLeft />Back</Button>
            </Link>
            <CampaignEditor
                type="new"
                className="m-auto"
                campaign={campaign}
                onChange={setCampaign}
                onSaveIntent={handleSaveIntent}
            />
        </PageMain>
    );
}
