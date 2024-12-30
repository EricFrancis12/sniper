import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function NullableComponent<T, P>({ value, defaultValue, onChange, title, Component, ...nativeProps }: {
    value: T | null;
    defaultValue: T;
    onChange: (t: T | null) => void;
    title?: string;
    Component: React.FC<{ value: T; onChange: (t: T) => void; disabled: boolean; nativeProps?: P; }>;
    nativeProps?: P;
}) {
    const [isNull, setIsNull] = useState(value === null);
    const [nonNullValue, setNonNullValue] = useState(value ?? defaultValue);

    function handleCheckedChange(checked: boolean) {
        setIsNull(!checked);
        onChange(checked ? nonNullValue : null);
    }

    function handleInputChange(t: T) {
        setNonNullValue(t);
        onChange(t);
    }

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={!isNull}
                onCheckedChange={handleCheckedChange}
            />
            {<span>{title}</span>}
            <Component
                {...nativeProps}
                disabled={isNull}
                value={nonNullValue}
                onChange={handleInputChange}
            />
        </div>
    );
}
