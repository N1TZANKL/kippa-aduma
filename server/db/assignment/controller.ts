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
    // assignee, creator, changedAt & status are not used because these values
    // can't be changed through this request.
    const { assignmentId, assigneeId, assignee, creator, changedAt, status, ...otherData } = data;

    let updateData: Partial<AssignmentModel> = {};

    switch (action) {
        case PatchActions.START:
            updateData = {
                status: AssignmentStatuses.IN_PROGRESS,
                assignee: mongoose.Types.ObjectId(currentUserId),
                changedAt: new Date().toISOString(),
            };
            break;
        case PatchActions.FINISH:
            updateData = { status: AssignmentStatuses.DONE, changedAt: new Date().toISOString() };
            break;
        case PatchActions.EDIT:
            updateData = { ...otherData };
            if (assigneeId) updateData.assignee = mongoose.Types.ObjectId(assigneeId);

            break;
        default:
            throw new Error("action not implemented!");
    }

    const assignment = await assignmentModel.findByIdAndUpdate(assignmentId, updateData, { new: true });
    return populateAssignmentWithId(assignment);
}

export async function deleteAssignment(assignmentId: string): Promise<void> {
    return assignmentModel.findByIdAndRemove(assignmentId);
}
