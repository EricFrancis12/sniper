import React, { useState } from "react";
import CampaignEditor from "@/components/CampaignEditor";
import { newCampaign } from "@/lib/utils";

export default function CreateCampaignPage() {
    const [campaign, setCampaign] = useState(newCampaign());

    return (
        <main className="h-screen w-full flex justify-center items-center">
            <CampaignEditor
                type="new"
                campaign={campaign}
                onChange={setCampaign}
                onSave={() => console.log("save not yet implimented")}
            />
        </main>
    );
}
