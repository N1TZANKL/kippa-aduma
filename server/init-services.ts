/* eslint-disable import/first */
/* eslint-disable import/order */
import dotenv from "dotenv";

dotenv.config({ path: `.env${process.env.NODE_ENV === "production" ? "" : ".local"}` });

import fs from "fs";
import path from "path";
import { createServer } from "http";
import socketIO from "socket.io";
import { connectToDb } from "../utils/middlewares/mongodb";

import log, { LogTypes } from "../utils/logger";
import messageModel from "./db/message/model";
import userModel from "./db/user/model";

initServices();

async function initServices() {
    initializeFileManager();
    const io = initializeChatSocket();
    await connectToDb();
    distributeNewChatMessages(io);
}

function distributeNewChatMessages(io: socketIO.Server) {
    const changeStream = messageModel.watch([{ $match: { operationType: "insert" } }], { fullDocument: "updateLookup" });

    changeStream.on("change", async (change) => {
        if (change.operationType === "insert") {
            const populatedDocument = await new messageModel(change.fullDocument)
                .populate({ path: "user", select: "-_id -passwordHash", model: userModel })
                .execPopulate();
            io.sockets.emit("new message", populatedDocument);
        }
    });

    log("Watching for new chat messages...", LogTypes.INFO);
}

function initializeChatSocket() {
    const server = createServer();
    const io = socketIO(server);

    // io.on("connection", (socket) => { console.log("new connection", socket.conn.remoteAddress); });

    server.listen(process.env.CHAT_PORT, () => log(`Chat listening on port ${process.env.CHAT_PORT}`, LogTypes.INFO));
    return io;
}

function initializeFileManager() {
    const fsRoot = `${process.env.NODE_ENV === "production" ? "" : __dirname}/storage`;

    const config = {
        fsRoot,
        rootName: "(Storage root)",
        port: process.env.STORAGE_PORT,
        host: "0.0.0.0",
    };

    if (!fs.existsSync(config.fsRoot)) fs.mkdirSync(config.fsRoot);

    const attachmentsFolder = path.join(config.fsRoot, "/post-attachments");
    if (!fs.existsSync(attachmentsFolder)) fs.mkdirSync(attachmentsFolder);

    // eslint-disable-next-line
    const filemanager = require("@opuscapita/filemanager-server");
    filemanager.server.run(config);

    log(`Storage API listening on 0.0.0.0:${process.env.STORAGE_PORT} from folder ${fsRoot}`, LogTypes.INFO);
}
