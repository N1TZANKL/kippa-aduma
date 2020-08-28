import { ChatMessage } from "interfaces";

export type UserModel = {
    username: string;
    nickname: string;
    passwordHash: string;
    color: string;
};

export type ChatMessageModel = Omit<ChatMessage, "user"> & { username: string };
