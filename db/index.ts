import mongoose from "mongoose";

const dbUrl = process.env.DATABASE_URL + (process.env.NODE_ENV === "production" ? "" : "?synchronize=true");

export function connectToDb(): Promise<typeof mongoose> {
    return mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: false });
}
