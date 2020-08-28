import express from "express";
import http from "http";
import socketIO from "socket.io";
import log, { LogTypes } from "utils/logger";
import { ChatMessage } from "interfaces";
import { getDb, Collections } from "utils/server/database";

const app = express();
app.use("/");

const server = http.createServer(app);
const io = socketIO(server);

function addMessage(message: ChatMessage) {
    return getDb().then((db) => db.collection(Collections.Chat).insertOne(message));
}

io.on("connection", (socket) => {
    socket.on("send message", async (messageDetails: Omit<ChatMessage, "timestamp">) => {
        const message = { ...messageDetails, timestamp: new Date().toISOString() };

        try {
            await addMessage(message);
            io.sockets.emit("receive message", message);
        } catch (error) {
            log("Caught error while attempting to create chat message:", LogTypes.ERROR, error);
        }
    });
});

server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));
