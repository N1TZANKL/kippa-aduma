import { withAuthenticatedUser } from "utils/session";
import userModel from "db/models/user";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { UserSessionObject } from "interfaces";

export async function getAllUsers(): Promise<UserSessionObject[]> {
    return userModel.find({}, "username nickname color -_id").lean();
}

export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllUsers());
    } catch (error) {
        log("Caught error while attempting to fetch users:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
