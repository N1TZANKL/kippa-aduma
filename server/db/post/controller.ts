import mongoose from "mongoose";

import { OperationPost } from "src/utils/interfaces";

import postModel, { OperationPostModel } from "./model";
import userModel from "../user/model";

export async function getAllPosts(): Promise<OperationPost[]> {
    return postModel
        .find({})
        .populate({ path: "author", select: "-passwordHash", model: userModel })
        .then((posts) =>
            posts.map(({ id, _doc: { _id, __v, author: { _doc: { _id: authorId, ...author } }, ...post } }) => ({
                id,
                ...post,
                author: { id: authorId.toString(), ...author },
            }))
        );
}

export async function createPost(userId: string, postData: Omit<OperationPostModel, "writtenAt" | "author">): Promise<OperationPost> {
    const operationPost: OperationPostModel = {
        ...postData,
        author: mongoose.Types.ObjectId(userId),
        writtenAt: new Date().toISOString(),
    };

    const newPostDoc = new postModel(operationPost);

    await newPostDoc.save();

    const {
        _doc: {
            _id: id,
            author: {
                _doc: { _id: authorId, ...author },
            },
            ...post
        },
    } = await newPostDoc.populate({ path: "author", select: "-passwordHash", model: userModel }).execPopulate();

    return { id, ...post, author: { id: authorId, ...author } };
}
