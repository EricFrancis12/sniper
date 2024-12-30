import React from "react";
import { Editor, EditorProps, loader } from "@monaco-editor/react";

loader.config({ paths: { vs: "monaco" } });

export default function CodeEditor(props: EditorProps) {
    return (
        <Editor {...props} />
    );
}
