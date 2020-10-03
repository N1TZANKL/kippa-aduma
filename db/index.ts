import { MongoClient, Db } from "mongodb";

export enum Collections {
    Users = "users",
    Messages = "messages",
}

const dbUrl = process.env.DATABASE_URL + (process.env.NODE_ENV === "production" ? "" : "?synchronize=true");

const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: false });

async function setUpDb(db: Db) {
    await db.collection(Collections.Users).createIndex({ username: 1 }, { unique: true });
    await db.collection(Collections.Messages).createIndex({ timestamp: 1 });
}

export async function getDb() {
    if (!client.isConnected()) await client.connect();

    const db = client.db(process.env.DB_NAME);
    await setUpDb(db);

    return db;
}
