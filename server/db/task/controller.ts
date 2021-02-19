import mongoose from "mongoose";

import { Task } from "src/utils/interfaces";

import taskModel, { TaskModel, TaskStatuses } from "./model";

export enum PatchActions {
    EDIT = "edit",
    START = "start",
    FINISH = "finish",
}

type PatchDataKey = keyof TaskModel | "taskId" | "assigneeId";

async function populateTaskWithIds(taskDoc: any): Promise<Task> {
    /* eslint-disable no-underscore-dangle */
    const {
        _doc: {
            _id: id,
            assignee,
            creator: {
                _doc: { _id: creatorId, ...creator },
            },
            ...task
        },
    } = await taskDoc.populate("creator assignee", "-passwordHash").execPopulate();

    const baseTask: Task = { ...task, id: id.toString(), creator: { ...creator, id: creatorId.toString() } };
    if (assignee) {
        const { _id: assigneeId, ...assigneeData } = assignee._doc;
        return { ...baseTask, assignee: { id: assigneeId.toString(), ...assigneeData } };
    }
    return baseTask;
    /* eslint-enable no-underscore-dangle */
}

export async function getAllTasks(): Promise<Task[]> {
    const tasks = await taskModel.find({});

    const populatedTasks = await Promise.all(tasks.map((task) => populateTaskWithIds(task)));

    return populatedTasks;
}

export async function createTask(userId: string, taskData: Omit<Task, "assignee">, assigneeId?: string): Promise<Task> {
    const task: TaskModel = {
        ...taskData,
        creator: mongoose.Types.ObjectId(userId),
        changedAt: new Date().toISOString(),
    };

    if (assigneeId) task.assignee = mongoose.Types.ObjectId(assigneeId);

    const newTaskDoc = new taskModel(task);

    await newTaskDoc.save();

    return populateTaskWithIds(newTaskDoc);
}

export async function patchTask(action: PatchActions, data: Record<PatchDataKey, string>, currentUserId: string): Promise<Task> {
    // assignee, creator, changedAt & status are not used because these values
    // can't be changed through this request.
    const { taskId, assigneeId, assignee, creator, changedAt, status, ...otherData } = data;

    let updateData: Partial<TaskModel> = {};

    switch (action) {
        case PatchActions.START:
            updateData = {
                status: TaskStatuses.IN_PROGRESS,
                assignee: mongoose.Types.ObjectId(currentUserId),
                changedAt: new Date().toISOString(),
            };
            break;
        case PatchActions.FINISH:
            updateData = { status: TaskStatuses.DONE, changedAt: new Date().toISOString() };
            break;
        case PatchActions.EDIT:
            updateData = { ...otherData };
            if (assigneeId) updateData.assignee = mongoose.Types.ObjectId(assigneeId);

            break;
        default:
            throw new Error("action not implemented!");
    }

    const task = await taskModel.findByIdAndUpdate(taskId, updateData, { new: true });
    return populateTaskWithIds(task);
}

export async function deleteTask(taskId: string): Promise<void> {
    return taskModel.findByIdAndRemove(taskId);
}
