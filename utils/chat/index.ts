import http from "http";
import socketIO from "socket.io";
import log, { LogTypes } from "../logger";
import { ChatMessage } from "interfaces";
import { getDb, Collections } from "../server/database";

export function initializeChatSocket() {
    const server = http.createServer();
    const io = socketIO(server);

    io.on("connection", (socket) => {
        console.log("new connection", socket.conn.remoteAddress);

        /* setTimeout(
            () =>
                io.sockets.emit("new message", {
                    type: "text",
                    message:
                        "testing\n 1 2 3\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the",
                    user: {
                        username: "redhood",
                        color: "red",
                    },
                    timestamp: "2020-08-27T18:30:47.237Z",
                }),
            3000
        ); */

        socket.on("post message", async (messageDetails: Omit<ChatMessage, "timestamp">) => {
            console.log("new message: ", messageDetails);

            /*         const message = { ...messageDetails, timestamp: new Date().toISOString() };
    
            try {
                await addMessage(message);
                io.sockets.emit("new message", message);
            } catch (error) {
                log("Caught error while attempting to create chat message:", LogTypes.ERROR, error);
            } */
        });
    });

    server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));
}
