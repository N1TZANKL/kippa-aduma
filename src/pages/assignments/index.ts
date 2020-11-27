import { AssignmentStatuses } from "server/db/assignment/model";

export { default as AssignmentsPanel } from "./assignments-panel/assignments-panel";
export { default as AssignmentsTopBar } from "./assignments-top-bar";

export const assignmentStatusToTitle: Record<AssignmentStatuses, string> = {
    [AssignmentStatuses.TODO]: "To Do",
    [AssignmentStatuses.IN_PROGRESS]: "In Progress",
    [AssignmentStatuses.DONE]: "Done",
};
