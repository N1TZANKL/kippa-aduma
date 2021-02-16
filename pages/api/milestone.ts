import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { APIFunctionObject } from "src/utils/interfaces";
import { getMilestones, addMilestone } from "server/db/milestone/controller";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

const methodToFunction: APIFunctionObject = {
    GET: async (res) => {
        try {
            return res.status(200).json(await getMilestones());
        } catch (error) {
            log("Caught error while attempting to fetch milestones:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req) => {
        if (!req.body) return res.status(400).send("No milestone sent");

        try {
            return res.status(200).json(await addMilestone(req.body));
        } catch (error) {
            log("Caught error while attempting to create milestone:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

export default withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});
