import { withIronSession } from "utils/session";
import { getDb, Collections } from "db";
import { UserModel } from "db/models/user";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";

export async function getAllUsers() {
    return getDb().then((db) =>
        db.collection(Collections.Users).find<UserModel>({}).project({ _id: 0, username: 1, nickname: 1, color: 1 }).toArray()
    );
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllUsers());
    } catch (error) {
        log(`Caught error while attempting to fetch users:`, LogTypes.ERROR, error);
        res.status(500).send(GeneralErrors.UnknownError);
    }
});
