import { ObjectId } from "mongodb";
import { withIronSession } from "utils/session";
import { getDb, Collections } from "db";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { ChatMessageModel } from "db/models/message";

type FileMessage = {
    name: string;
    type: string;
    size: number;
};

async function createMessage(userId: string, message: string | FileMessage) {
    const dbMessage: ChatMessageModel = {
        timestamp: new Date().toISOString(),
        user: new ObjectId(userId),
        ...(typeof message === "string"
            ? {
                  type: "text",
                  message,
              }
            : {
                  type: "file",
                  message: message.name,
                  fileType: message.type,
                  fileSize: message.size,
              }),
    };

    return getDb().then((db) => db.collection(Collections.Messages).insertOne(dbMessage));
}

export default withIronSession(async (req, res) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    if (!req.body) return res.status(400).send("No message sent");

    try {
        await createMessage(req.session.get("user").id, req.body); // sanitize message?
        return res.status(200).send("Message added successfully");
    } catch (error) {
        log(`Caught error while attempting to create chat message:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
