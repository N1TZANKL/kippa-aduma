import { SvgIconComponent } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import TodoIcon from "@material-ui/icons/Schedule";
import InProgressIcon from "@material-ui/icons/Timer";

import { TaskStatuses } from "server/db/task/model";

export const STATUS_TO_TEXT: Record<TaskStatuses, string> = {
    [TaskStatuses.TODO]: "To Do",
    [TaskStatuses.IN_PROGRESS]: "In Progress",
    [TaskStatuses.DONE]: "Done",
};

export const STATUS_TO_DISPLAYED_TIMESTAMP: Record<TaskStatuses, { timestampKey: "changedAt" | "deadlineAt"; timestampText: string }> = {
    [TaskStatuses.TODO]: { timestampKey: "changedAt", timestampText: "Created" },
    [TaskStatuses.IN_PROGRESS]: { timestampKey: "deadlineAt", timestampText: "Deadline" },
    [TaskStatuses.DONE]: { timestampKey: "changedAt", timestampText: "Finished" },
};

export const STATUS_TO_CHANGED_TIMESTAMP_MEANING: Record<TaskStatuses, string> = {
    [TaskStatuses.TODO]: "Created",
    [TaskStatuses.IN_PROGRESS]: "Started",
    [TaskStatuses.DONE]: "Finished",
};

export const STATUS_TO_ICON: Record<TaskStatuses, SvgIconComponent> = {
    [TaskStatuses.TODO]: TodoIcon,
    [TaskStatuses.IN_PROGRESS]: InProgressIcon,
    [TaskStatuses.DONE]: DoneIcon,
};
