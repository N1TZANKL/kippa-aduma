import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import credModel, { CredModel } from "db/models/cred";

async function createCred(credData: CredModel) {

    const credDoc = new credModel(credData);
    return credDoc.save();
}

export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    if (!req.body) return res.status(400).send("No cred sent");

    try {
        return res.status(200).json(await createCred(req.body));
    } catch (error) {
        log("Caught error while attempting to create credential:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
