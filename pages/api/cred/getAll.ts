import { withAuthenticatedUser } from "utils/session";
import credModel, { CredModel } from "db/models/cred";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";

export async function getAllCreds(): Promise<CredModel[]> {
    return credModel.find({}, "-_id -__v").lean();
}

export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllCreds());
    } catch (error) {
        log("Caught error while attempting to fetch creds:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});