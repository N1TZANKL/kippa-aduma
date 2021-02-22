import mongoose from "mongoose";

import Models from "../models";

export enum OperationPostTypes {
    UPDATE = "update", // default
    RECON = "recon",
    ACTION = "action",
    SUCCESS = "success",
    BURN = "burn",
}

export type OperationPostModel = {
    title?: string;
    description: string;
    additionalInformation: string;
    type: OperationPostTypes;
    writtenAt: string;
    happenedAt: string;
    author: mongoose.Types.ObjectId;
};

const postsSchema = new mongoose.Schema({
    title: String,
    description: String,
    additionalInformation: String,
    type: String,
    writtenAt: String,
    happenedAt: String,
    author: {
        ref: Models.SYSTEM_USER,
        type: mongoose.Schema.Types.ObjectId,
    },
});

export default mongoose.models?.[Models.OPERATION_POST] || mongoose.model<OperationPostModel & mongoose.Document>(Models.OPERATION_POST, postsSchema);
