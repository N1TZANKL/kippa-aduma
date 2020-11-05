import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import messageModel, { ChatMessageModel } from "db/models/message";
import { ChatMessage, UserSessionObject } from "interfaces";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

export async function getAllMessages(): Promise<ChatMessage[]> {
    return messageModel.find({}, "-_id").populate("user", "-_id -passwordHash").lean();
}

type FileMessage = {
    name: string;
    type: string;
    size: number;
};

async function createMessage(userId: string, message: string | FileMessage) {
    const dbMessage: ChatMessageModel = {
        timestamp: new Date().toISOString(),
        user: mongoose.Types.ObjectId(userId),
        ...(typeof message === "string"
            ? {
                  type: "text",
                  message,
              }
            : {
                  type: "file",
                  message: message.name,
                  fileType: message.type,
                  fileSize: message.size,
              }),
    };

    const newMessage = new messageModel(dbMessage);
    return newMessage.save();
}

type APIFunctionObject = { [key: string]: (res: NextApiResponse<unknown>, req: NextApiRequest, user: UserSessionObject) => void };
const methodToFunction: APIFunctionObject = {
    GET: async (res /* , req */) => {
        try {
            return res.status(200).json(await getAllMessages()); // TODO: paging?
        } catch (error) {
            log("Caught error while attempting to fetch chat messages:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req, user) => {
        if (!req.body) return res.status(400).send("No message sent");

        try {
            await createMessage(user.id, req.body); // sanitize message?
            return res.status(200).send("Message added successfully");
        } catch (error) {
            log("Caught error while attempting to create chat message:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

export default withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});
