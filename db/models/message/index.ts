import mongoose from "mongoose";

import Models from "../index";

export type ChatMessageModel = {
    type: "text" | "file";
    message: string;
    timestamp: string; // TODO: change type to be more specific?
    fileSize?: number;
    fileType?: string;
    user: mongoose.Types.ObjectId;
};

const messagesSchema = new mongoose.Schema({
    type: String,
    message: String,
    timestamp: String,
    fileSize: String,
    fileType: String,
    user: {
        ref: Models.SYSTEM_USER,
        type: mongoose.Schema.Types.ObjectId,
    },
});

export default mongoose.models?.[Models.CHAT_MESSAGE] || mongoose.model<ChatMessageModel & mongoose.Document>(Models.CHAT_MESSAGE, messagesSchema);
