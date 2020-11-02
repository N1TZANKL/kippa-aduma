import * as bcrypt from "bcryptjs";
import generateRandomColor from "randomcolor";

import { withIronSession } from "utils/session";
import { RegisterErrors, GeneralErrors } from "server/errors";
import log, { LogTypes } from "utils/logger";
import userModel, { UserModel } from "db/models/user";

async function addUser(userData: UserModel) {
    const newUser = new userModel(userData);
    return newUser.save();
}

export default withIronSession(async (req, res) => {
    const { username, nickname, password } = req.body;

    if (!username || !nickname || !password) return res.status(400).send(RegisterErrors.MissingFields);

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const color = generateRandomColor(); // TODO: generate better colors?

        const result = await addUser({
            username,
            nickname,
            passwordHash,
            color,
        });

        log(`User '${username} (${nickname})' added successfully!`, LogTypes.SUCCESS);

        req.session.set("user_id", result._id.toString());
        // TODO - FUTURE: Implement a "private club" approach and approve a user only when an admin has accepted their request
        await req.session.save();

        return res.status(201).send("User created");
    } catch (error) {
        log(`Caught error while attempting to add user '${username}':`, LogTypes.ERROR, error);

        if (error.name === "MongoError" && error.code === 11000) return res.status(403).send(RegisterErrors.UserAlreadyExists);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
