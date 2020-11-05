import mongoose from "mongoose";

import { OperationPost } from "interfaces";

import postModel, { OperationPostModel } from "./model";

export async function getAllPosts(): Promise<OperationPost[]> {
    return postModel.find({}, "-_id").populate("author", "-_id -passwordHash").lean();
}

export async function createPost(userId: string, postData: Omit<OperationPostModel, "writtenAt" | "author">): Promise<OperationPost> {
    const operationPost: OperationPostModel = {
        ...postData,
        author: mongoose.Types.ObjectId(userId),
        writtenAt: new Date().toISOString(),
    };

    const newPostDoc = new postModel(operationPost);

    await newPostDoc.save();

    return newPostDoc.populate("author", "-_id -passwordHash").execPopulate();
}
