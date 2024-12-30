import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import TitleWrapper from "./TitleWrapper";
import NullableInput from "./nullable/NullableInput";
import NullableNumberInput from "./nullable/NullableNumberInput";
import SelectCollector from "./SelectCollector";
import { isKeyTriggerType } from "@/lib/utils";
import { KeyName, ModifierKeyName, Trigger, TriggerType } from "@/lib/types";

export default function TriggerEditor({ trigger, onChange, onSaveIntent = () => { }, onCloseIntent = () => { } }: {
    trigger: Trigger;
    onChange: (t: Trigger) => void;
    onSaveIntent?: () => void;
    onCloseIntent?: () => void;
}) {
    return (
        <Card className="flex flex-col gap-2 p-2">
            <CardContent className="flex flex-col gap-2 p-4">
                <TitleWrapper title={trigger.disabled ? "Trigger Off" : "Trigger On"}>
                    <Switch
                        checked={!trigger.disabled}
                        onCheckedChange={(disabled) => onChange({
                            ...trigger,
                            disabled: !disabled,
                        })}
                    />
                </TitleWrapper>
                <TitleWrapper title="Trigger Type">
                    <Select
                        value={trigger.triggerType}
                        onValueChange={(tt) => onChange({
                            ...trigger,
                            triggerType: tt as TriggerType,
                        })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Trigger Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(TriggerType).map((tt) => (
                                <SelectItem key={tt} value={tt}>
                                    {tt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TitleWrapper>
                {isKeyTriggerType(trigger.triggerType)
                    && <TitleWrapper title="Key Name">
                        <Select
                            value={trigger.keyName ?? ""}
                            onValueChange={(k) => onChange({
                                ...trigger,
                                keyName: k as KeyName,
                            })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Key" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(KeyName).map((k) => (
                                    <SelectItem key={k} value={k}>
                                        {k}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </TitleWrapper>
                }
                <TitleWrapper title="While Pressing Keys">
                    <SelectCollector
                        items={trigger.whilePressed}
                        availItems={Object.values(ModifierKeyName)}
                        onChange={(items) => onChange({
                            ...trigger,
                            whilePressed: items as ModifierKeyName[],
                        })}
                    />
                </TitleWrapper>
                <NullableInput
                    title="Selector"
                    nativeProps={{ placeholder: "Selector" }}
                    value={trigger.selector}
                    onChange={(selector) => onChange({
                        ...trigger,
                        selector,
                    })}
                />
                <NullableNumberInput
                    title="Max Number of Matches"
                    nativeProps={{ placeholder: "Max Matches" }}
                    value={trigger.maxMatches}
                    onChange={(maxMatches) => onChange({
                        ...trigger,
                        maxMatches,
                    })}
                />
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Button onClick={onSaveIntent}>
                    Confirm
                </Button>
                <Button onClick={onCloseIntent}>
                    Back
                </Button>
            </CardFooter>
        </Card>
    )
}
