import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getAllPosts, createPost } from "db/post/controller";
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
            return res.status(200).json(await getAllPosts());
        } catch (error) {
            log("Caught error while attempting to fetch operation posts:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req, user) => {
        if (!req.body) return res.status(400).send("No post sent");

        try {
            return res.status(200).json(await createPost(user.id, req.body));
        } catch (error) {
            log("Caught error while attempting to create operation post:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

export default withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});
