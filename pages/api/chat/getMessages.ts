import { withIronSession } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import messageModel from "db/models/message";

export async function getAllMessages() {
    return messageModel.find({}, "-_id").populate("user", "-_id -passwordHash").lean();
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllMessages()); //TODO: paging?
    } catch (error) {
        log(`Caught error while attempting to fetch chat messages:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
