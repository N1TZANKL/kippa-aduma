import { withIronSession } from "utils/session";
import { getDb, Collections } from "db";
import log, { LogTypes } from "utils/logger";
import { ChatMessage } from "interfaces";
import { GeneralErrors } from "server/errors";

export async function getAllMessages() {
    return getDb().then((db) =>
        db
            .collection(Collections.Messages)
            .aggregate<ChatMessage>([
                {
                    // find all users with _id field equal to message.user
                    $lookup: {
                        from: Collections.Users,
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    // take first element of the users result array
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true, // if array is empty (user deleted) - still return document
                    },
                },
                {
                    // TODO: take only what is necessary
                    $project: {
                        _id: 0,
                        "user._id": 0,
                        "user.passwordHash": 0,
                    },
                },
            ])
            .toArray()
    );
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        const messages = await getAllMessages(); //TODO: paging

        return res.status(200).json(messages);
    } catch (error) {
        log(`Caught error while attempting to fetch chat messages:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
