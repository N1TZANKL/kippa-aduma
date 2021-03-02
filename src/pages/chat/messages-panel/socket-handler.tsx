import { useEffect } from "react";
import { SetState, ChatMessage } from "src/utils/interfaces";
import socketIOClient from "socket.io-client";

type SocketHandlerProps = { setMessages: SetState<ChatMessage[]> };

export default function SocketHandler({ setMessages }: SocketHandlerProps) {
    // Socket connection initialization
    useEffect(() => {
        const socket = socketIOClient(`http://${window.location.hostname}:${process.env.CHAT_PORT}`);
        socket.on("new message", onReceiveNewMessage);
        return () => {
            socket.disconnect();
        };
    }, []);

    function onReceiveNewMessage(newMessage: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]); // TODO: read about Mutable
    }

    return null;
}
