import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TitleWrapper({ title, children, className }: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn(className, "flex items-center gap-2")} >
            <span>{title}</span>
            {children}
        </div>
    );
}
