import {useEffect, useRef, useState} from "react";
import {Socket, Channel} from "phoenix";

const API_BASE_CHAT = process.env.NEXT_PUBLIC_PHOENIX_URL

export function useChat(classId: string, token: string | undefined) {
    const [messages, setMessages] = useState<string[]>([])
    const channelRef = useRef<Channel | null>(null)

    useEffect(() => {
        const socket = new Socket(`${API_BASE_CHAT}/socket`, {
            params: { token }
        })
        socket.connect()

        const channel = socket.channel(`stream:${classId}`, {})
        channel.join().receive("ok", (response: { messages?: { body: string }[] }) => {
            if (response.messages) {
                setMessages(response.messages.map((m) => m.body))
            }
        })
        channel.on("new_message", (payload) => {
            console.log("new_message payload:", payload)
            setMessages((prev) => [...prev, payload.message])
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