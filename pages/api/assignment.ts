import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getAllAssignments, createAssignment, deleteAssignment } from "server/db/assignment/controller";
import { APIFunctionObject } from "src/utils/interfaces";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

const methodToFunction: APIFunctionObject = {
    GET: async (res) => {
        try {
            return res.status(200).json(await getAllAssignments());
        } catch (error) {
            log("Caught error while attempting to fetch assignments:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req) => {
        if (!req.body) return res.status(400).send("No assignment sent");

        try {
            return res.status(200).json(await createAssignment(req.body));
        } catch (error) {
            log("Caught error while attempting to create assignment:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    DELETE: async (res, req) => {
        if (!req.body.id) return res.status(400).send("No assignment id sent");

        try {
            await deleteAssignment(req.body.id);
            return res.status(200).send("Assignments deleted successfully");
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
