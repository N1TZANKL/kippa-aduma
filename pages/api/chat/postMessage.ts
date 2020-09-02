import { withIronSession } from "utils/session";
import { getDb, Collections } from "utils/server/database";
import log, { LogTypes } from "utils/logger";
import { ChatMessage } from "interfaces";
import { GeneralErrors } from "utils/server/errors";

async function createMessage(message: ChatMessage) {
    return getDb().then((db) => db.collection(Collections.Chat).insertOne(message));
}

export default withIronSession(async (req, res) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    if (!req.body?.message) return res.status(400).send("Bad message");

    try {
        await createMessage({ ...req.body.message, timestamp: new Date().toISOString() }); // sanitize message?
        return res.status(200).send("Message added successfully");
    } catch (error) {
        log(`Caught error while attempting to create chat message:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
