import { withIronSession } from "utils/session";
import { getDb, Collections } from "utils/server/database";
import { UserModel } from "utils/server/models";
import log, { LogTypes } from "utils/logger";

async function getAllUsers() {
    return getDb().then((db) => db.collection(Collections.Users).find<UserModel>({}).toArray());
}

export default withIronSession(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        const users = await getAllUsers();

        return res.status(201).json({ users: users.map(({ username, nickname, color }) => ({ username, nickname, color })) });
    } catch (error) {
        log(
            `Caught error while attempting to fetch users: ${error.name} ${error.codeName || error.message || ""} (error code ${
                error.code || "unknown"
            })`,
            LogTypes.ERROR
        );
        res.status(500).send("something went wrong");
    }
});
