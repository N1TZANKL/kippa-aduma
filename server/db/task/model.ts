import mongoose from "mongoose";

import Models from "server/db/models";

export enum TaskStatuses {
    TODO = "todo", // default
    IN_PROGRESS = "progress",
    DONE = "done",
}

export type TaskModel = {
    description: string;
    additionalInformation?: string;
    status: TaskStatuses;
    changedAt: string;
    deadlineAt?: string;
    creator: mongoose.Types.ObjectId;
    assignee?: mongoose.Types.ObjectId;
};

const tasksSchema = new mongoose.Schema({
    description: String,
    additionalInformation: String,
    status: String,
    changedAt: String,
    deadlineAt: String,
    creator: {
        ref: Models.SYSTEM_USER,
        type: mongoose.Schema.Types.ObjectId,
    },
    assignee: {
        ref: Models.SYSTEM_USER,
        type: mongoose.Schema.Types.ObjectId,
    },
});

export default mongoose.models?.[Models.TASK] || mongoose.model<TaskModel & mongoose.Document>(Models.TASK, tasksSchema);
