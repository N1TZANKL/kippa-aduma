import { withIronSession } from "utils/session";
import userModel from "db/models/user";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";

export async function getAllUsers() {
    return userModel.find({}, "username nickname color -_id").lean();
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllUsers());
    } catch (error) {
        log(`Caught error while attempting to fetch users:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
