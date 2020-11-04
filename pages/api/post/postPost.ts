import mongoose from "mongoose";

import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import postModel, { OperationPostModel } from "db/models/post";

async function createPost(userId: string, postData: Omit<OperationPostModel, "writtenAt" | "author">) {
    const operationPost: OperationPostModel = {
        ...postData,
        author: mongoose.Types.ObjectId(userId),
        writtenAt: new Date().toISOString(),
    };

    const newPostDoc = new postModel(operationPost);

    await newPostDoc.save();

    return newPostDoc.populate("author", "-_id -passwordHash").execPopulate();
}

export default withAuthenticatedUser(async (req, res, user) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    if (!req.body) return res.status(400).send("No post sent");

    try {
        return res.status(200).json(await createPost(user.id, req.body));
    } catch (error) {
        log("Caught error while attempting to create operation post:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
