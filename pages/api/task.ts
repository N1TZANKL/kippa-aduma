import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getAllTasks, createTask, patchTask, deleteTask, PatchActions } from "server/db/task/controller";
import { APIFunctionObject } from "src/utils/interfaces";

// this NextJS config is to prevent the message "API resolved without sending a response"
export const config = {
    api: {
        externalResolver: true,
    },
};

const methodToFunction: APIFunctionObject = {
    GET: async (res) => {
        try {
            return res.status(200).json(await getAllTasks());
        } catch (error) {
            log("Caught error while attempting to fetch tasks:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    POST: async (res, req, user) => {
        if (!req.body) return res.status(400).send("No task sent");

        try {
            const { assigneeId, ...reqData } = req.body;
            return res.status(200).json(await createTask(user.id, reqData, assigneeId));
        } catch (error) {
            log("Caught error while attempting to create task:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    PATCH: async (res, req, user) => {
        if (!req.body) return res.status(400).send("No task sent");

        const { action, data } = req.body;

        if (!Object.values(PatchActions).includes(action) || !data.taskId) return res.status(400).send("Invalid request");

        try {
            return res.status(200).json(await patchTask(action, data, user.id));
        } catch (error) {
            log(`Caught error while attempting to ${action} task:`, LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
    DELETE: async (res, req) => {
        if (!req.body.id) return res.status(400).send("No task id sent");

        try {
            await deleteTask(req.body.id);
            return res.status(200).send("Task deleted successfully");
        } catch (error) {
            log("Caught error while attempting to delete task:", LogTypes.ERROR, error);
            return res.status(500).send(GeneralErrors.UnknownError);
        }
    },
};

export default withAuthenticatedUser(async (req, res, user) => {
    if (!req.method || !Object.keys(methodToFunction).includes(req.method)) return res.status(404).send("Invalid api call");

    return methodToFunction[req.method](res, req, user);
});
