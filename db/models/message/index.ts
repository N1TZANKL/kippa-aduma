import { ObjectId } from "mongodb";

export type ChatMessageModel = {
    type: "text" | "file";
    message: string;
    timestamp: string; // TODO: change type to be more specific?
    fileSize?: number;
    fileType?: string;
    user: ObjectId;
};
