"use client";

import  { useEffect, useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered, Type, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Start typing...", minHeight = "200px" }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update editor content when value prop changes, but only if it's different
    // to avoid cursor jumping
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        handleInput();
    };

    if (!isMounted) return null;

    return (
        <div className="flex flex-col w-full border rounded-md bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-1 border-b bg-muted/30">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("bold")}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("italic")}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("underline")}
                    title="Underline"
                >
                    <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("insertUnorderedList")}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("insertOrderedList")}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => execCommand("removeFormat")}
                    title="Clear Formatting"
                >
                    <Type className="h-4 w-4" />
                </Button>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="p-4 outline-none prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                style={{ minHeight }}
                data-placeholder={placeholder}
                onPaste={(e) => {
                    // Default paste behavior in contentEditable handles rich text formatting
                    // from sources like Word, Google Docs, or other websites.
                    // We don't need to do anything special here unless we want to strip styles,
                    // but the user explicitly wants to KEEP styles.
                }}
            />

            {/* CSS for placeholder and basic styling */}
            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #94a3b8;
                    cursor: text;
                }
                [contenteditable] {
                    cursor: text;
                }
            `}</style>
        </div>
    );
}
