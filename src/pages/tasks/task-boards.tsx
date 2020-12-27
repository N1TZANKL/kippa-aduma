import React, { useState, useContext } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Task } from "src/utils/interfaces";
import { TaskStatuses } from "server/db/task/model";
import { Patch } from "src/utils/helpers/api";
import { PatchActions } from "server/db/task/controller";
import TasksContext from "src/pages/tasks/context";

import TasksPanel from "./tasks-panel";
import TaskInfoDialog from "./task-info-dialog";

async function patchTask(taskId: string, action: PatchActions, data?: Record<string, string>): Promise<Task> {
    const res = await Patch("task", { action, data: { taskId, ...data } });
    if (res.ok) return res.json();

    const errorMessage = await res.text();
    throw new Error(errorMessage);
}

type TaskBoardsProps = {
    tasks: Task[];
};

export default function TaskBoards({ tasks }: TaskBoardsProps): JSX.Element {
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);

    const { replaceTask } = useContext(TasksContext);

    async function handleTaskStatusChange(dropResult: DropResult) {
        if (!dropResult.destination) return;

        const {
            source: { droppableId: currStatus },
            destination: { droppableId: newStatus },
            draggableId,
        } = dropResult;

        const actionToMatch: Partial<Record<PatchActions, boolean>> = {
            [PatchActions.START]: currStatus === TaskStatuses.TODO && newStatus === TaskStatuses.IN_PROGRESS,
            [PatchActions.FINISH]: currStatus === TaskStatuses.IN_PROGRESS && newStatus === TaskStatuses.DONE,
            // revisit
            // unstart
        };

        const matchedAction = Object.keys(actionToMatch).find((key) => !!actionToMatch[key as PatchActions]);
        if (!matchedAction) return;

        const task = tasks.find((a) => a.id === draggableId);
        if (!task) return;

        try {
            replaceTask({ ...task, status: newStatus }); // for UI smoothness - we will assume it worked
            const patchedTask = await patchTask(draggableId, matchedAction as PatchActions);
            replaceTask(patchedTask);
        } catch (e) {
            replaceTask(task);
        }

        // if action = start, open deadline popup
    }

    function getTasksByStatus(status: TaskStatuses) {
        return tasks.filter((a) => a.status === status);
    }

    const showTaskInfo = (taskId: string) => setOpenTaskId(taskId);
    const hideTaskInfo = () => setOpenTaskId(null);

    return (
        <>
            <DragDropContext onDragEnd={handleTaskStatusChange}>
                <TasksPanel
                    flexBasis={"29%"}
                    marginRight="15px"
                    hiddenProps={{ smDown: true }}
                    status={TaskStatuses.TODO}
                    tasks={getTasksByStatus(TaskStatuses.TODO)}
                    showTaskInfo={showTaskInfo}
                />
                <TasksPanel
                    flexBasis={"40%"}
                    flexGrow={1}
                    status={TaskStatuses.IN_PROGRESS}
                    tasks={getTasksByStatus(TaskStatuses.IN_PROGRESS)}
                    showTaskInfo={showTaskInfo}
                />
                <TasksPanel
                    flexBasis={"29%"}
                    marginLeft="15px"
                    hiddenProps={{ mdDown: true }}
                    status={TaskStatuses.DONE}
                    tasks={getTasksByStatus(TaskStatuses.DONE)}
                    showTaskInfo={showTaskInfo}
                />
            </DragDropContext>
            <TaskInfoDialog onClose={hideTaskInfo} task={tasks.find((a) => a.id === openTaskId)} />
        </>
    );
}
