import mongoose from "mongoose";

import { Assignment } from "src/utils/interfaces";

import assignmentModel, { AssignmentModel, AssignmentStatuses } from "./model";

export enum PatchActions {
    EDIT = "edit",
    START = "start",
    FINISH = "finish",
}

type PatchDataKey = keyof AssignmentModel | "assignmentId" | "assigneeId";

async function populateAssignmentWithId(assignmentDoc: mongoose.Document): Promise<Assignment> {
    const {
        _doc: { _id: id, ...assignment },
    } = await assignmentDoc.populate("creator assignee", "-_id -passwordHash").execPopulate();

    return { id, ...assignment };
}

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

    return populateAssignmentWithId(newAssignmentDoc);
}

export async function patchAssignment(action: PatchActions, data: Record<PatchDataKey, string>, currentUserId: string): Promise<Assignment> {
    const { assignmentId } = data;
    switch (action) {
        case PatchActions.START:
            return startAssignment(assignmentId, currentUserId);
        case PatchActions.FINISH:
            return finishAssignment(assignmentId);
        case PatchActions.EDIT:
            return editAssignment(data);
        default:
            throw new Error("action not implemented!");
    }
}

async function startAssignment(assignmentId: string, currentUserId: string): Promise<Assignment> {
    const assignment = await assignmentModel.findByIdAndUpdate(assignmentId, {
        status: AssignmentStatuses.IN_PROGRESS,
        assignee: mongoose.Types.ObjectId(currentUserId),
        changedAt: new Date().toISOString(),
    });

    return populateAssignmentWithId(assignment);
}

async function finishAssignment(assignmentId: string): Promise<Assignment> {
    const assignment = await assignmentModel.findByIdAndUpdate(assignmentId, {
        status: AssignmentStatuses.DONE,
        changedAt: new Date().toISOString(),
    });

    return populateAssignmentWithId(assignment);
}

async function editAssignment(requestData: Record<PatchDataKey, any>): Promise<Assignment> {
    // creator, changedAt & status are not used because these values
    // can't be changed through this request.
    const { assignmentId, assigneeId, creator, changedAt, status, ...otherData } = requestData;

    const newAssignmentData: Partial<AssignmentModel> = { ...otherData };

    if (assigneeId) newAssignmentData.assignee = mongoose.Types.ObjectId(assigneeId);

    const assignment = await assignmentModel.findByIdAndUpdate(assignmentId, newAssignmentData);
    return populateAssignmentWithId(assignment);
}
