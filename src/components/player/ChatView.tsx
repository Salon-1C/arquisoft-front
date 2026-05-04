"use client"

import { useState } from "react"
import {useChat} from "@/hooks/useChat";

interface ChatViewProps {
    classId: string
    token: string | undefined
}

export default function ChatView({ classId, token} : ChatViewProps) {
    const { messages, sendMessage } = useChat(classId, token)
    const [input, setInput] = useState("")

    function handleSend() {
        if (!input.trim()) return
        sendMessage(input)
        setInput("")
    }

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <p className="text-sm font-semibold text-[var(--color-text)]">Chat en Vivo</p>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                {messages.map((msg, i) => (
                    <div key={i} className="rounded-md bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    placeholder="Escribe un mensaje..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}