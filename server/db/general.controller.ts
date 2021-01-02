import { Credential, OperationPost } from "src/utils/interfaces";

import credModel from "./cred/model";
import postModel from "./post/model";
import tasksModel, { TaskStatuses } from "./task/model";

export async function getHighlights(): Promise<{ cred: Credential; post: OperationPost }> {
    const [[{ _id: credId, ...cred }], [{ _id: postId, ...post }]] = await Promise.all([
        credModel.find().sort({ _id: -1 }).limit(1).lean(),
        postModel.find().sort({ _id: -1 }).limit(1).populate("author", "-_id -passwordHash").lean(),
    ]);

    return { cred: { id: credId, ...cred }, post: { id: postId, ...post } };
}

type OverviewObject = { credsAmount: number; postsAmount: number; finishedTasksAmount: number };

export async function getOverview(): Promise<OverviewObject> {
    const resArray = await Promise.all([
        credModel.count({}).then((count) => ({ credsAmount: count })),
        postModel.count({}).then((count) => ({ postsAmount: count })),
        tasksModel.count({ status: TaskStatuses.DONE }).then((count) => ({ finishedTasksAmount: count })),
    ]);

    return resArray.reduce((obj, curr) => ({ ...obj, ...curr }), {}) as OverviewObject;
}
