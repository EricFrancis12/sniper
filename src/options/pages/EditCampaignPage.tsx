import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CampaignEditor from "@/components/CampaignEditor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/use-campaigns";
import PageMain from "../PageMain";
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
            setCampaigns(campaigns.map((c) => c.id === WIPCampaign.id ? WIPCampaign : c));
            toast({ title: "Campaign Saved Successfully" });
        }
    }

    return (
        <PageMain className="flex flex-col">
            <Link to="/campaigns">
                <Button><ArrowLeft />Back</Button>
            </Link>
            {WIPCampaign
                ? <CampaignEditor
                    type="edit"
                    className="m-auto"
                    campaign={WIPCampaign}
                    onChange={setWIPCampaign}
                    onSaveIntent={handleSaveIntent}
                />
                : <p className="m-auto font-bold italic">Campaign not found...</p>
            }
        </PageMain>
    );
}
