import * as bcrypt from "bcryptjs";

import { withIronSession } from "utils/session";
import { LoginErrors, GeneralErrors } from "server/errors";
import log, { LogTypes } from "utils/logger";
import { getUser } from "server/db/user/controller";
import withDBConnection from "utils/middlewares/mongodb";

const loginHandler = withIronSession(async (req, res) => {
    if (req.method !== "POST") return res.status(404).send("Invalid api call");

    const { username, password } = req.body;

    if (!(username || password)) res.status(400).send(LoginErrors.MissingFields);

    try {
        const dbUser = await getUser(username);
        if (!dbUser) return res.status(400).send(LoginErrors.InvalidCredentials);

        const hashResult = await bcrypt.compare(password, dbUser.passwordHash);
        if (!hashResult) return res.status(400).send(LoginErrors.InvalidCredentials);

        req.session.set("user_id", dbUser.id);
        await req.session.save();

        log(`'${username}' logged into the system`, LogTypes.SUCCESS);

        return res.status(200).send("Logged in successfully");
    } catch (error) {
        log(`Caught error while attempting login for '${username}':`, LogTypes.ERROR, error);

        return res.status(500).send(GeneralErrors.UnknownError);
    }
});

export default withDBConnection(loginHandler);
