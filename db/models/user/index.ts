import mongoose from "mongoose";

import Models from "db/models";

export type UserModel = {
    username: string;
    nickname: string;
    color: string;
    passwordHash: string;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    nickname: String,
    color: String,
    passwordHash: String,
});

export default mongoose.models[Models.SYSTEM_USER]
    || mongoose.model<UserModel & mongoose.Document>(Models.SYSTEM_USER, userSchema);
