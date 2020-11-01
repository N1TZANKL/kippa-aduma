import { withAuthenticatedUser } from "utils/session";
import credModel from "db/models/cred";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import {Credential} from "interfaces";

export async function getAllCreds(): Promise<Credential[]> {
    // return cred + _id as id + filter unecessary fields
    return credModel.find({}).then(creds => creds.map(({id, _doc: {_id, __v, ...cred}}) => ({id, ...cred})));
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