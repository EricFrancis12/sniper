import React from "react";
import "@/index.css";
import { useCampaigns } from "@/hooks/use-campaigns";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CampaignsPage() {
    const [campaigns] = useCampaigns();

    return (
        <main className="h-screen w-full p-4">
            <SidebarTrigger />
            <Link to="/campaigns/create">
                <Button>
                    Create New Campaign
                </Button>
            </Link>
            <div className="flex flex-col items-center gap-2">
                {campaigns.length === 0
                    ? <p className="font-bold italic">No campaigns found...</p>
                    : campaigns.map((campaign) => (
                        <div key={campaign.id}>
                            {campaign.name}
                        </div>
                    ))}
            </div>
        </main>
    );
}
