import {useEffect, useRef, useState} from "react";
import {Socket, Channel} from "phoenix";
import {ChatMessage} from "@/types/chat";

const API_BASE_CHAT = process.env.NEXT_PUBLIC_PHOENIX_URL

export function useChat(classId: string, token: string | undefined) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const channelRef = useRef<Channel | null>(null)

    useEffect(() => {
        const socket = new Socket(`${API_BASE_CHAT}/socket`, {
            params: { token }
        })
        socket.connect()

        const channel = socket.channel(`stream:${classId}`, {})
        channel.join().receive("ok", (response: { messages?: { username: string; body: string; sent_at: string }[] }) => {
            if (response.messages) {
                setMessages(response.messages.map((m) => ({ username: m.username, body: m.body, sentAt: m.sent_at })))
            }
        })
        channel.on("new_message", (payload: { username: string; message: string; sent_at: string }) => {
            console.log("new_message payload:", payload)
            setMessages((prev) => [...prev, { username: payload.username, body: payload.message, sentAt: payload.sent_at }])
        })
        channelRef.current = channel

        return () => {
            channel.leave()
            socket.disconnect()
        }
    }, [classId, token])

    function sendMessage(content: string) {
        channelRef.current?.push("new_message", {message: content})
            .receive("ok", () => console.log("sent"))
            .receive("error", (err) => console.error(err))
    }

    return {messages, sendMessage}
}