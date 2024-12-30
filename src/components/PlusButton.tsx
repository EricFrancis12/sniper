import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlusButton({ onClick, className }: {
    onClick: () => void;
    className?: string;
}) {
    return (
        <Plus
            className={cn(className, "mx-2 cursor-pointer hover:opacity-70")}
            onClick={onClick}
        />
    );
}
