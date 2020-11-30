import { AssignmentStatuses } from "server/db/assignment/model";

export { default as AssignmentsTopBar } from "./assignments-top-bar";
export { default as AssignmentBoards } from "./assignment-boards";

export const assignmentStatusToTitle: Record<AssignmentStatuses, string> = {
    [AssignmentStatuses.TODO]: "To Do",
    [AssignmentStatuses.IN_PROGRESS]: "In Progress",
    [AssignmentStatuses.DONE]: "Done",
};
