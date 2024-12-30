import React from "react";
import { Pencil, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Handler } from "@/lib/types";
import { truncateWithEllipsis } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";

export default function HandlerItem({ handler, onChange, onDelete }: {
    handler: Handler;
    onChange: (h: Handler) => void;
    onDelete?: () => void;
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
                <TrashIcon onClick={onDelete} className="cursor-pointer" />
                <DrawerContent>
                    <DrawerHeader>
                        <Switch
                            checked={!handler.disabled}
                            onCheckedChange={(disabled) => onChange({
                                ...handler,
                                disabled: !disabled,
                            })}
                        />
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
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
