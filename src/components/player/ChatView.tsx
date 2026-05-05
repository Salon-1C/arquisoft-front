"use client"

import { useState } from "react"
import {useChat} from "@/hooks/useChat";

interface ChatViewProps {
    classId: string
    token: string | undefined
}

function formatTime(sentAt: string): string {
    const normalized = /Z|[+-]\d{2}:\d{2}$/.test(sentAt) ? sentAt : sentAt + "Z"
    return new Date(normalized).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true })
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
            <p className="text-sm font-bold">Chat en Vivo</p>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                {messages.map((msg, i) => (
                    <div key={i} className="rounded-md bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]">
                        <div className="flex items-baseline justify-between gap-2">
                            <span className="flex-1 min-w-0">
                                <span className="text-primary">{msg.username}:</span> {msg.body}
                            </span>
                            <span className="shrink-0 text-xs text-[var(--color-text-muted)]">{formatTime(msg.sentAt)}</span>
                        </div>
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