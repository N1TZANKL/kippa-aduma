import { getDb } from "utils/server/database";
import * as bcrypt from "bcryptjs";
import { withIronSession } from "utils/session";
import { MongoError } from "mongodb";
import { RegisterErrors } from "interfaces/user";

export default withIronSession(async (req, res) => {
    const { username, nickname, password } = req.body;

    if (!username || !nickname || !password)
        return res.status(400).send(RegisterErrors.MissingFields);

    try {
        const db = await getDb();

        const passwordHash = await bcrypt.hash(password, 10);
        await db.collection("users").insertOne({ username, nickname, passwordHash });

        req.session.set("user", { username });
        await req.session.save();
        res.status(201).send("User created");
    }
    catch (error) {
        if (error instanceof MongoError && error.code === 11000)
            res.status(403).send(RegisterErrors.UserAlreadyExists);
        else res.status(500).send(RegisterErrors.UnknownError);
    }
});