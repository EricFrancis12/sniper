import React from "react";
import { Input } from "@/components/ui/input";
import { NullableComponent } from ".";

function _Input({ value, onChange, disabled, nativeProps }: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
    nativeProps?: React.ComponentPropsWithoutRef<"input">;
}) {
    return (
        <Input
            {...nativeProps}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
        />
    );
}

export default function NullableInput({ value, onChange, title, ...nativeProps }: {
    value: string | null;
    onChange: (v: string | null) => void;
    title?: string;
    nativeProps?: React.ComponentPropsWithoutRef<"input">;
}) {
    return (
        <NullableComponent
            {...nativeProps}
            value={value}
            defaultValue={""}
            onChange={onChange}
            Component={_Input}
            title={title}
        />
    );
}
