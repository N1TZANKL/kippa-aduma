import * as bcrypt from "bcryptjs";
import { withIronSession } from "utils/session";
import { getDb, Collections, DbUser } from "utils/server/database";

export default withIronSession(
    async (req, res) => {
        if (req.method !== "POST") return res.status(404).send("Invalid api call");

        const { username, password } = req.body;

        const db = await getDb();
        const dbUser = await db.collection(Collections.Users).findOne<DbUser>({ username });

        if (!dbUser) return res.status(400).send("User does not exist");

        const hashResult = await bcrypt.compare(password, dbUser.passwordHash);

        if (!hashResult) return res.status(400).send("Password is not correct");

        req.session.set("user", { username });
        await req.session.save();
        return res.status(201).send("");
    });
