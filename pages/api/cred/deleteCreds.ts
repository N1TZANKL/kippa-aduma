import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import credModel from "db/models/cred";
import mongoose from "mongoose";

async function deleteCreds(credIds: string[]) {
    return credModel.remove({_id: {
        $in: credIds.map(id => mongoose.Types.ObjectId(id))
    }});
}

export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "DELETE") return res.status(404).send("Invalid api call");

    if (!req.body.ids) return res.status(400).send("No cred ids sent");

    try {
        await deleteCreds(req.body.ids);
        return res.status(200).send("Creds deleted successfully");
    } catch (error) {
        log("Caught error while attempting to batch delete credentials:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
