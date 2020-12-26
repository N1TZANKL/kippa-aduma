import { SvgIconComponent } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import TodoIcon from "@material-ui/icons/Schedule";
import InProgressIcon from "@material-ui/icons/Timer";

import { AssignmentStatuses } from "server/db/assignment/model";

export const STATUS_TO_TEXT: Record<AssignmentStatuses, string> = {
    [AssignmentStatuses.TODO]: "To Do",
    [AssignmentStatuses.IN_PROGRESS]: "In Progress",
    [AssignmentStatuses.DONE]: "Done",
};

export const STATUS_TO_DISPLAYED_TIMESTAMP: Record<AssignmentStatuses, { timestampKey: "changedAt" | "deadlineAt"; timestampText: string }> = {
    [AssignmentStatuses.TODO]: { timestampKey: "changedAt", timestampText: "Created" },
    [AssignmentStatuses.IN_PROGRESS]: { timestampKey: "deadlineAt", timestampText: "Deadline" },
    [AssignmentStatuses.DONE]: { timestampKey: "changedAt", timestampText: "Finished" },
};

export const STATUS_TO_CHANGED_TIMESTAMP_MEANING: Record<AssignmentStatuses, string> = {
    [AssignmentStatuses.TODO]: "Created",
    [AssignmentStatuses.IN_PROGRESS]: "Started",
    [AssignmentStatuses.DONE]: "Finished",
};

export const STATUS_TO_ICON: Record<AssignmentStatuses, SvgIconComponent> = {
    [AssignmentStatuses.TODO]: TodoIcon,
    [AssignmentStatuses.IN_PROGRESS]: InProgressIcon,
    [AssignmentStatuses.DONE]: DoneIcon,
};
