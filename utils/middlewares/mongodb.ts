import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import log, { LogTypes } from "../logger";

const mongoHost = process.env.NODE_ENV === "production" ? process.env.MONGO_HOST : "localhost";
const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${mongoHost}:27017/${process.env.DB_NAME}${
    process.env.NODE_ENV === "production" ? "" : "?synchronize=true"
}`;

export function connectToDb(): Promise<typeof mongoose> | null {
    if (mongoose.connections[0].readyState) return null;

    log(`Connecting to mongo database running at ${mongoHost}...`, LogTypes.INFO);

    return mongoose
        .connect(connectionString, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
        })
        .then((res) => {
            log(`Successfully connected to mongo database!`, LogTypes.SUCCESS);
            return res;
        });
}

type HandlerFunc = (
    req: NextApiRequest,
    res?: NextApiResponse,
    user?: unknown /* it's actually UserSessionObject, but this prevents a dependency cycle */
) => Promise<any>;

const withDBConnection = (handler: HandlerFunc) => async (req: NextApiRequest, res?: NextApiResponse, user?: unknown): Promise<any> => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res, user);
    }
    // Use new db connection
    await connectToDb();
    return handler(req, res, user);
};

export default withDBConnection;
