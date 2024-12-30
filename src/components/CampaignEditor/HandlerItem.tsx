import React from "react";
import { Pencil, TrashIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Handler } from "@/lib/types";
import { truncateWithEllipsis } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";
import TitleWrapper from "../TitleWrapper";

export default function HandlerItem({ handler, onChange, onDeleteIntent }: {
    handler: Handler;
    onChange: (h: Handler) => void;
    onDeleteIntent?: () => void;
}) {
    function handleCodeEditorChange(script?: string) {
        if (script !== undefined) {
            onChange({
                ...handler,
                script,
            });
        }
    }

    return (
        <div className="flex items-center gap-2 p-2 bg-slate-200 rounded-full">
            <Drawer>
                <DrawerTrigger><Pencil /></DrawerTrigger>
                <TrashIcon onClick={onDeleteIntent} className="cursor-pointer" />
                <DrawerContent>
                    <DrawerHeader>
                        <TitleWrapper title={handler.disabled ? "Handler Off" : "Handler On"}>
                            <Switch
                                checked={!handler.disabled}
                                onCheckedChange={(disabled) => onChange({
                                    ...handler,
                                    disabled: !disabled,
                                })}
                            />
                        </TitleWrapper>
                        <DrawerClose>
                            Close
                        </DrawerClose>
                    </DrawerHeader>
                    <CodeEditor
                        height="50vh"
                        width="100%"
                        language="javascript"
                        value={handler.script}
                        onChange={handleCodeEditorChange}
                    />
                </DrawerContent>
            </Drawer>
            <p className="whitespace-nowrap">{truncateWithEllipsis(handler.script, 50)}</p>
        </div>
    );
}
