import http from "http";
import socketIO from "socket.io";
import log, { LogTypes } from "../logger";
import { ChatMessage } from "interfaces";
import { getDb, Collections } from "../server/database";

function addMessage(message: ChatMessage) {
    return getDb().then((db) => db.collection(Collections.Chat).insertOne(message));
}

export function initializeChatSocket() {
    const server = http.createServer();
    const io = socketIO(server);

    io.on("connection", (socket) => {
        console.log("new connection", socket);

        socket.on("post message", async (messageDetails: Omit<ChatMessage, "timestamp">) => {
            console.log("new message: ", messageDetails);

            /*         const message = { ...messageDetails, timestamp: new Date().toISOString() };
    
            try {
                await addMessage(message);
                io.sockets.emit("receive message", message);
            } catch (error) {
                log("Caught error while attempting to create chat message:", LogTypes.ERROR, error);
            } */
        });
    });

    server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));
}
