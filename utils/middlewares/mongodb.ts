import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSessionObject } from "../session";

const connectionString =
    process.env.MONGO_CONNECTION_STRING ||
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.DB_NAME}${
        process.env.NODE_ENV === "production" ? "" : "?synchronize=true"
    }`;

export function connectToDb() {
    if (mongoose.connections[0].readyState) return;

    return mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    });
}

type HandlerFunc = (req: NextApiRequest, res?: NextApiResponse, user?: UserSessionObject) => Promise<any>;

const withDBConnection = (handler: HandlerFunc) => async (req: NextApiRequest, res?: NextApiResponse, user?: UserSessionObject) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res, user);
    }
    // Use new db connection
    await connectToDb();
    return handler(req, res, user);
};

export default withDBConnection;
