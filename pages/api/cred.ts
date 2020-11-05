import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getAllCreds, createCred, deleteCreds } from "db/cred/controller";
import { APIFunctionObject } from "interfaces";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

const methodToFunction: APIFunctionObject = {
    GET: async (res) => {
        try {
            return res.status(200).json(await getAllCreds());
        } catch (error) {
            log("Caught error while attempting to fetch creds:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req) => {
        if (!req.body) return res.status(400).send("No cred sent");

        try {
            return res.status(200).json(await createCred(req.body));
        } catch (error) {
            log("Caught error while attempting to create credential:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    DELETE: async (res, req) => {
        if (!req.body.ids) return res.status(400).send("No cred ids sent");

        try {
            await deleteCreds(req.body.ids);
            return res.status(200).send("Creds deleted successfully");
        } catch (error) {
            log("Caught error while attempting to batch delete credentials:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

export default withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});
