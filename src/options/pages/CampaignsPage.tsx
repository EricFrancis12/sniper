import React from "react";
import { Link } from "react-router-dom";
import { Copy, Pencil, TrashIcon } from "lucide-react";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageMain from "../PageMain";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
import { cloneCampaignWithName } from "@/lib/types";

export default function CampaignsPage() {
    const { toast } = useToast();
    const [campaigns, setCampaigns] = useCampaigns();

    function handleDeleteCampaign(campaignId: string) {
        setCampaigns(campaigns.filter((c) => c.id !== campaignId));
        toast({ title: `Campaign ${campaignId} was deleted` });
    }

    function handleCloneCampaign(campaignId: string) {
        const campaign = campaigns.find((c) => c.id === campaignId);
        if (campaign) {
            setCampaigns([
                ...campaigns,
                cloneCampaignWithName(campaign, `${campaign.name} (copy)`),
            ]);
        }
    }

    return (
        <PageMain>
            <Link to="/campaigns/create">
                <Button>
                    Create New Campaign
                </Button>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {campaigns.length === 0
                    ? <p className="font-bold italic">No campaigns found...</p>
                    : campaigns.map((campaign) => (
                        <Card key={campaign.id}>
                            <CardHeader className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        campaign.disabled ? "bg-red-400" : "bg-green-400",
                                        "h-[20px] w-[20px] rounded-full",
                                    )}
                                />
                                <CardTitle>{campaign.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center">
                                <Link to={`/campaigns/${campaign.id}/edit`}>
                                    <Button>
                                        <Pencil />
                                    </Button>
                                </Link>
                                <Button onClick={() => handleDeleteCampaign(campaign.id)}>
                                    <TrashIcon />
                                </Button>
                                <Button onClick={() => handleCloneCampaign(campaign.id)}>
                                    <Copy />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </PageMain>
    );
}
