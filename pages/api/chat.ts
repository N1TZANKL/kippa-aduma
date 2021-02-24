import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { APIFunctionObject } from "src/utils/interfaces";
import { getChatMessages, createMessage } from "server/db/message/controller";
import withDBConnection from "utils/middlewares/mongodb";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

const methodToFunction: APIFunctionObject = {
    GET: async (res) => {
        try {
            return res.status(200).json(await getChatMessages()); // TODO: paging?
        } catch (error) {
            log("Caught error while attempting to fetch chat messages:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req, user) => {
        if (!req.body) return res.status(400).send("No message sent");

        try {
            await createMessage(user.id, req.body); // sanitize message?
            return res.status(200).send("Message added successfully");
        } catch (error) {
            log("Caught error while attempting to create chat message:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

const chatHandler = withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});

export default withDBConnection(chatHandler);
