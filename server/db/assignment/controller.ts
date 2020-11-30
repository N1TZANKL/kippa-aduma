import mongoose from "mongoose";

import { Assignment } from "src/utils/interfaces";

import assignmentModel, { AssignmentModel } from "./model";

// function getAssignmentById(assignmentId: string) {}

export async function getAllAssignments(): Promise<Assignment[]> {
    const assignments = await assignmentModel.find({}).populate("creator assignee", "-_id -passwordHash").lean();

    return assignments.map(({ _id, __v, ...assignment }) => ({ ...assignment, id: _id.toString() } as Assignment));
}

export async function createAssignment(userId: string, assignmentData: Omit<Assignment, "assignee">, assigneeId?: string): Promise<Assignment> {
    const assignment: AssignmentModel = {
        ...assignmentData,
        creator: mongoose.Types.ObjectId(userId),
        changedAt: new Date().toISOString(),
    };

    if (assigneeId) assignment.assignee = mongoose.Types.ObjectId(assigneeId);

    const newAssignmentDoc = new assignmentModel(assignment);

    await newAssignmentDoc.save();

    return newAssignmentDoc.populate("creator assignee", "-_id -passwordHash").execPopulate();
}

/* export async function startAssignment(assignmentId: string, assigneeId: string): Promise<Assignment> {
    // return startedAssignmentDoc.populate("creator", "-_id -passwordHash").populate("assignee", "-_id -passwordHash").execPopulate();
}

export async function finishAssignment(assignmentId: string): Promise<Assignment> {
    // return finishedAssignmentDoc.populate("creator", "-_id -passwordHash").populate("assignee", "-_id -passwordHash").execPopulate();
} */
