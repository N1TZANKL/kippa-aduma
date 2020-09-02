import * as bcrypt from "bcryptjs";
import { withIronSession } from "utils/session";
import { getDb, Collections } from "utils/server/database";
import { UserModel } from "utils/server/models";
import { LoginErrors, GeneralErrors } from "utils/server/errors";
import log, { LogTypes } from "utils/logger";

async function getUser(username: string) {
    return getDb().then((db) =>
        db.collection(Collections.Users).findOne<UserModel>({ username })
    );
}

export default withIronSession(async (req, res) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    const { username, password } = req.body;

    if (!username || !password) res.status(400).send(LoginErrors.MissingFields);

    try {
        const dbUser = await getUser(username);
        if (!dbUser) return res.status(400).send(LoginErrors.InvalidCredentials);

        const hashResult = await bcrypt.compare(password, dbUser.passwordHash);
        if (!hashResult) return res.status(400).send(LoginErrors.InvalidCredentials);

        req.session.set("user", { username, nickname: dbUser.nickname, color: dbUser.color });
        await req.session.save();

        log(`'${username}' logged into the system)`, LogTypes.SUCCESS);

        return res.status(200).send("Logged in successfully");
    } catch (error) {
        log(`Caught error while attempting login for '${username}':`, LogTypes.ERROR, error);

        res.status(500).send(GeneralErrors.UnknownError);
    }
});
