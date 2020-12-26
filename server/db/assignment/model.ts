import mongoose from "mongoose";

import Models from "server/db/models";

export enum AssignmentStatuses {
    TODO = "todo", // default
    IN_PROGRESS = "progress",
    DONE = "done",
}

export type AssignmentModel = {
    description: string;
    additionalInformation?: string;
    status: AssignmentStatuses;
    changedAt: string;
    deadlineAt?: string;
    creator: mongoose.Types.ObjectId;
    assignee?: mongoose.Types.ObjectId;
};

const assignmentsSchema = new mongoose.Schema({
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

export default mongoose.models?.[Models.ASSIGNMENT] || mongoose.model<AssignmentModel & mongoose.Document>(Models.ASSIGNMENT, assignmentsSchema);
