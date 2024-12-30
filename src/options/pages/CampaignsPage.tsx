import React from "react";
import { Link } from "react-router-dom";
import { Pencil, TrashIcon } from "lucide-react";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageMain from "../PageMain";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";

export default function CampaignsPage() {
    const { toast } = useToast();
    const [campaigns, setCampaigns] = useCampaigns();

    function handleDeleteCampaign(campaignId: string) {
        setCampaigns(campaigns.filter((c) => c.id !== campaignId));
        toast({ title: `Campaign ${campaignId} was deleted` });
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
                            <CardContent>
                                <Link to={`/campaigns/${campaign.id}/edit`}>
                                    <Button>
                                        <Pencil />
                                    </Button>
                                </Link>
                                <Button onClick={() => handleDeleteCampaign(campaign.id)}>
                                    <TrashIcon />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </PageMain>
    );
}
