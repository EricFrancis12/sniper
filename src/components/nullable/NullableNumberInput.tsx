import React from "react";
import NullableInput from "./NullableInput";

export default function NullableNumberInput({ value, onChange, ...nativeProps }: {
    value: number | null;
    onChange: (v: number | null) => void;
    nativeProps?: React.ComponentPropsWithoutRef<"input">;
}) {
    function handleChange(inputValue: string | null) {
        if (inputValue !== null) {
            const n = parseFloat(inputValue);
            if (!Number.isNaN(n)) {
                onChange(n);
            }
        }
    }

    return (
        <NullableInput
            {...nativeProps}
            value={value?.toString() ?? null}
            onChange={handleChange}
        />
    );
}
