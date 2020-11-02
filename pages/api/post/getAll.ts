import { withAuthenticatedUser } from "utils/session";
import postModel, { OperationPostModel } from "db/models/post";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";

export async function getAllPosts(): Promise<OperationPostModel[]> {
    return postModel.find({}, "-_id").populate("author", "-_id -passwordHash").lean();
}

export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllPosts());
    } catch (error) {
        log("Caught error while attempting to fetch operation posts:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
