import React from "react";
import { TargetIcon, Settings } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useCampaigns } from "@/hooks/use-campaigns";
import { downloadAsJsonFile } from "@/lib/utils";
import { SniperData } from "@/lib/types";

const items = [
    {
        title: "Campaigns",
        url: "#campaigns",
        icon: TargetIcon,
    },
    {
        title: "Settings",
        url: "#settings",
        icon: Settings,
    },
];

export default function AppSidebar() {
    const [campaigns] = useCampaigns();

    function handleExport() {
        downloadAsJsonFile(
            { campaigns } satisfies SniperData,
            "sniper.json",
        );
    }

    return (
        <Sidebar>
            <SidebarHeader>Sniper</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button onClick={handleExport}>Export Data</Button>
                {/* TODO: impliment load sniper.json file */}
            </SidebarFooter>
        </Sidebar>
    );
}
