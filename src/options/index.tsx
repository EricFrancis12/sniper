import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "@/index.css";
import CampaignsPage from "./pages/CampaignsPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import EditCampaignPage from "./pages/EditCampaignPage";
import SettingsPage from "./pages/SettingsPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

function Options() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<CampaignsPage />} index />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/campaigns/create" element={<CreateCampaignPage />} />
                    <Route path="/campaigns/:campaignId/edit" element={<EditCampaignPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </HashRouter>
        </SidebarProvider>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);
