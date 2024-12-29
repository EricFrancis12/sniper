import React, { ReactNode } from "react";

export default function TitleWrapper({ title, children }: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="flex items-center gap-2" >
            <span>{title}</span>
            {children}
        </div>
    );
}
