import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TitleWrapper from "./TitleWrapper";
import NullableInput from "./nullable/NullableInput";
import { Campaign } from "@/lib/types";

export default function CampaignEditor({ type, campaign, onChange = () => { }, onSave = () => { } }: {
    type: "new" | "edit";
    campaign: Campaign;
    onChange?: (c: Campaign) => void;
    onSave?: () => void;
}) {
    return (
        <Card className="flex flex-col gap-2 p-2">
            <CardHeader>
                <CardTitle>{type === "new" ? "Create New Campaign" : "Edit Campaign"}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4">
                <TitleWrapper title={campaign.disabled ? "Campaign Off" : "Campaign On"}>
                    <Switch
                        checked={!campaign.disabled}
                        onCheckedChange={(disabled) => onChange({
                            ...campaign,
                            disabled: !disabled,
                        })}
                    />
                </TitleWrapper>
                <TitleWrapper title="Campaign name"            >
                    <Input
                        placeholder="Campaign name"
                        value={campaign.name}
                        onChange={(e) => onChange({
                            ...campaign,
                            name: e.target.value,
                        })}
                    />
                </TitleWrapper>
                <TitleWrapper title="Url Regex">
                    <NullableInput
                        nativeProps={{ placeholder: "Url Regex" }}
                        value={campaign.urlRegex}
                        onChange={(urlRegex) => onChange({
                            ...campaign,
                            urlRegex,
                        })}
                    />
                </TitleWrapper>
                <TitleWrapper title="Triggers">
                    TODO: campaign.triggers
                </TitleWrapper>
                <TitleWrapper title="Handlers">
                    TODO: campaign.handlers
                </TitleWrapper>
            </CardContent>
            <CardFooter>
                <Button onClick={() => onSave()}>
                    {type === "new" ? "Create" : "Save"}
                </Button>
            </CardFooter>
        </Card>
    );
}
