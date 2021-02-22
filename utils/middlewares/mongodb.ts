import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSessionObject } from "utils/session";

type HandlerFunc = (req: NextApiRequest, res?: NextApiResponse, user?: UserSessionObject) => Promise<any>;

const withDBConnection = (handler: HandlerFunc) => async (req: NextApiRequest, res?: NextApiResponse, user?: UserSessionObject) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res, user);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    });
    return handler(req, res, user);
};

export default withDBConnection;
