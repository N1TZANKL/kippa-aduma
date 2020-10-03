import Models from "db/models";

export type UserModel = {
    username: string;
    nickname: string;
    color: string;
    passwordHash: string;
};
