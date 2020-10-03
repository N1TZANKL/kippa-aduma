require("dotenv").config({ path: `.env.local` });

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Db } from "mongodb";
import http from "http";
import socketIO from "socket.io";
import log, { LogTypes } from "../utils/logger";
import { getDb, Collections } from "../utils/server/database";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let changeStream;
const watchNewChatMessages = async (db: Db, io: socketIO.Server) => {
    changeStream = db.collection(Collections.Messages).watch([{ $match: { operationType: "insert" } }], { fullDocument: "updateLookup" });

    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const { _id, ...newMessage } = change.fullDocument;
            io.sockets.emit("new message", newMessage);
        }
    });

    log("Watching for new messages...", LogTypes.INFO);
};

export function initializeChatSocket() {
    const server = http.createServer();
    const io = socketIO(server);

    io.on("connection", (socket) => {
        console.log("new connection", socket.conn.remoteAddress);
    });

    server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));

    return io;
}

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        const { pathname, query } = parsedUrl;

        if (pathname === "/a") app.render(req, res, "/a", query);
        else if (pathname === "/b") app.render(req, res, "/b", query);
        else handle(req, res, parsedUrl);
    }).listen(port);

    // tslint:disable-next-line:no-console
    log(`Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`, LogTypes.SUCCESS);
    Promise.all([getDb(), initializeChatSocket()]).then(([db, io]) => watchNewChatMessages(db, io));
});
