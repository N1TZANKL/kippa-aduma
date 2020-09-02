import { withIronSession } from "utils/session";
import { getDb, Collections } from "utils/server/database";
import log, { LogTypes } from "utils/logger";
import { ChatMessage } from "interfaces";
import { GeneralErrors } from "utils/server/errors";

async function getAllMessages() {
    return getDb().then((db) => db.collection(Collections.Chat).find<ChatMessage>({}).toArray());
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        const messages = await getAllMessages(); //TODO: paging

        return res.status(200).json(messages);
    } catch (error) {
        log(`Caught error while attempting to fetch chat messages:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
