import mongoose from "mongoose";

import { Assignment } from "src/utils/interfaces";
import { DUMMY_ASSIGNMENTS } from "src/utils/mocks";

import assignmentModel, { AssignmentModel } from "./model";

function getAssignmentById(assignmentId: string) {}

export async function getAllAssignments(): Promise<Assignment[]> {
    return DUMMY_ASSIGNMENTS;
    //return assignmentModel.find({}, "-_id").populate("author", "-_id -passwordHash").lean();
}

export async function createAssignment(userId: string, assignmentData: any): Promise<Assignment> {
    const assignment: AssignmentModel = {
        ...assignmentData,
        creator: mongoose.Types.ObjectId(userId),
        createdAt: new Date().toISOString(),
    };

    const newAssignmentDoc = new assignmentModel(assignment);

    await newAssignmentDoc.save();

    return newAssignmentDoc.populate("creator", "-_id -passwordHash").execPopulate();
}

export async function startAssignment(assignmentId: string, assigneeId: string): Promise<Assignment> {
    //return startedAssignmentDoc.populate("creator", "-_id -passwordHash").populate("assignee", "-_id -passwordHash").execPopulate();
}

export async function finishAssignment(assignmentId: string): Promise<Assignment> {
    //return finishedAssignmentDoc.populate("creator", "-_id -passwordHash").populate("assignee", "-_id -passwordHash").execPopulate();
}
