import { ObjectId } from "mongodb";

export type UserModel = {
    username: string;
    nickname: string;
    color: string;
    passwordHash: string;
};

export type ChatMessageModel = {
    type: "text" | "file";
    message: string;
    timestamp: string; // TODO: change type to be more specific?
    fileSize?: number;
    fileType?: string;
    user: ObjectId;
};
