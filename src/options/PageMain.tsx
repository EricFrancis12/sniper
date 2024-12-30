import React, { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function PageMain({ children, className }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <main className="h-screen w-full p-4">
            <SidebarTrigger />
            <div className={cn(className, "h-full w-full p-2")}>
                {children}
            </div>
        </main>
    )
}
