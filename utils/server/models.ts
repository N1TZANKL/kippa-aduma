import { DbChatMessage } from "interfaces";

export type UserModel = {
    username: string;
    nickname: string;
    color: string;
    passwordHash: string;
};

export type ChatMessageModel = DbChatMessage;
