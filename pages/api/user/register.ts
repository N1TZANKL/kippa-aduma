import { NextApiHandler } from "next";
import { getDb } from "utils/server/database";
import * as bcrypt from "bcryptjs";
import { withIronSession } from "utils/session";

export default withIronSession(async (req, res) => {
    const db = await getDb();

    const { username, nickname, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ username, nickname, passwordHash });

    req.session.set("user", { username });
    await req.session.save();
    res.status(201).send("User created");
});