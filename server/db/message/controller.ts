import mongoose, { Document } from "mongoose";

import { ChatMessage } from "src/utils/interfaces";

import messageModel, { ChatMessageModel } from "./model";

type FileMessage = {
    name: string;
    type: string;
    size: number;
};

export async function getChatMessages(): Promise<ChatMessage[]> {
    return messageModel.find({}, "-_id").populate("user", "-_id -passwordHash").lean();
}

export async function createMessage(userId: string, message: string | FileMessage): Promise<Document> {
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
