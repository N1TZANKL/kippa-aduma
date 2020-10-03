import { getDb, Collections } from "db";
import * as bcrypt from "bcryptjs";
import { withIronSession } from "utils/session";
import { MongoError } from "mongodb";
import { RegisterErrors, GeneralErrors } from "server/errors";
import generateRandomColor from "randomcolor";
import log, { LogTypes } from "utils/logger";
import { UserModel } from "db/models";

async function addUser(userData: UserModel) {
    return getDb().then((db) => db.collection(Collections.Users).insertOne(userData));
}

export default withIronSession(async (req, res) => {
    const { username, nickname, password } = req.body;

    if (!username || !nickname || !password) return res.status(400).send(RegisterErrors.MissingFields);

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const color = generateRandomColor(); //TODO: generate better colors?

        const result = await addUser({ username, nickname, passwordHash, color });

        log(`User '${username} (${nickname})' added successfully!`, LogTypes.SUCCESS);

        req.session.set("user", { id: result.insertedId.toString(), username, nickname, color });
        await req.session.save(); // TODO - FUTURE: Implement a "private club" approach and approve a user only when an admin has accepted their request

        res.status(201).send("User created");
    } catch (error) {
        log(`Caught error while attempting to add user '${username}':`, LogTypes.ERROR, error);

        if (error instanceof MongoError && error.code === 11000) res.status(403).send(RegisterErrors.UserAlreadyExists);
        else res.status(500).send(GeneralErrors.UnknownError);
    }
});
