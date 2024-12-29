import React from "react";
import { useParams } from "react-router-dom";

export default function EditCampaignsPage() {
    const { campaignId } = useParams();
    console.log(campaignId);

    return (
        <main>
            EditCampaignsPage
        </main>
    );
}
