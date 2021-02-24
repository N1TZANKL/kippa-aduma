import { Credential, OperationPost } from "src/utils/interfaces";

import credModel from "./cred/model";
import postModel from "./post/model";
import userModel from "./user/model";
import tasksModel, { TaskStatuses } from "./task/model";

export async function getHighlights(): Promise<{ cred: Credential | null; post: OperationPost | null }> {
    try {
        const [[{ _id: credId, ...cred }], [{ _id: postId, ...post }]] = await Promise.all([
            credModel.find().sort({ _id: -1 }).limit(1).lean(),
            postModel.find().sort({ _id: -1 }).limit(1).populate({ path: "author", select: "-_id -passwordHash", model: userModel }).lean(),
        ]);

        return { cred: { id: credId, ...cred } as Credential, post: { id: postId, ...post } as OperationPost };
    } catch (e) {
        // no highlights
        return { cred: null, post: null };
    }
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
