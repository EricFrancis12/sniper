import React from "react";
import { XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";

export default function SelectCollector({ items, availItems, onChange }: {
    items: string[];
    availItems: string[];
    onChange: (newItems: string[]) => void;
}) {
    function addNewItem(item: string) {
        if (!items.includes(item)) onChange([...items, item]);
    }

    function deleteItem(item: string) {
        onChange(items.filter(_item => _item !== item));
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full p-1 bg-white border border-black rounded">
                {items.length === 0
                    ? <p className="font-bold italic">No items selected</p>
                    : items.map((item, i) => (
                        <span key={i} className="inline-block rounded-full bg-gray-300 m-1 p-1">
                            <div className="flex justify-center items-center gap-1 px-1">
                                <span className="flex justify-center items-center ml-1">
                                    {item}
                                </span>
                                <XCircle
                                    className="cursor-pointer hover:opacity-70"
                                    onClick={() => deleteItem(item)}
                                />
                            </div>
                        </span>
                    ))}
            </div>
            <Select
                value=""
                onValueChange={addNewItem}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Key" />
                </SelectTrigger>
                <SelectContent>
                    {availItems
                        .filter((item) => !items.includes(item))
                        .map((item, i) => (
                            <SelectItem key={i} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
