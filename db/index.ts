import mongoose from "mongoose";
import log, { LogTypes } from "../utils/logger";

const dbUrl = process.env.DATABASE_URL + (process.env.NODE_ENV === "production" ? "" : "?synchronize=true");

export function connectToDb(): Promise<typeof mongoose> {
    return mongoose
        .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: false })
        .then((res) => {
            log(`Connected to database ${process.env.DB_NAME || ""}`, LogTypes.SUCCESS);
            return res;
        })
        .catch((e) => {
            log(`Caught error connecting to database:`, LogTypes.ERROR, e);
            return e;
        });
}
