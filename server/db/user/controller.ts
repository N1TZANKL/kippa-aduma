import { Document } from "mongoose";

import { UserSessionObject } from "utils/session";

import userModel, { UserModel } from "./model";

export async function getAllUsers(): Promise<UserSessionObject[]> {
    return userModel.find({}, "-passwordHash").then((users) => users.map(({ id, _doc: { _id, __v, ...user } }) => ({ id, ...user })));
}

export async function addUser(userData: UserModel): Promise<Document> {
    const newUser = new userModel(userData);
    return newUser.save();
}

export async function getUser(username: string): Promise<UserSessionObject & { passwordHash: string }> {
    return userModel.findOne({ username }).then(({ id, _doc: { _id, __v, ...user } }) => ({ id, ...user }));
}
