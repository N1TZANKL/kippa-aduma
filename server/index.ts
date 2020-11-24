/* eslint-disable import/first */
/* eslint-disable import/order */
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { parse } from "url";
import http, { createServer } from "http";

import next from "next";
import socketIO from "socket.io";

import log, { LogTypes } from "../utils/logger";
import connectToDb from "./db";
import messageModel from "./db/message/model";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// server "main"

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

    connectToDb();
    const io = initializeChatSocket();
    distributeNewChatMessages(io);

    // Promise.all([getDb(), initializeChatSocket()]).then(([db, io]) => watchNewChatMessages(db, io));
});

function distributeNewChatMessages(io: socketIO.Server) {
    const changeStream = messageModel.watch([{ $match: { operationType: "insert" } }], { fullDocument: "updateLookup" });

    changeStream.on("change", async (change) => {
        if (change.operationType === "insert") {
            const populatedDocument = await new messageModel(change.fullDocument).populate("user", "-_id -passwordHash").execPopulate();
            io.sockets.emit("new message", populatedDocument);
        }
    });

    log("Watching for new chat messages...", LogTypes.INFO);
}

function initializeChatSocket() {
    const server = http.createServer();
    const io = socketIO(server);

    // io.on("connection", (socket) => { console.log("new connection", socket.conn.remoteAddress); });

    server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));
    return io;
}
