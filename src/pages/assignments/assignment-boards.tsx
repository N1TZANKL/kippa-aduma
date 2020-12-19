import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Assignment } from "src/utils/interfaces";
import { AssignmentStatuses } from "server/db/assignment/model";
import { Patch } from "src/utils/helpers/api";
import { PatchActions } from "server/db/assignment/controller";

import AssignmentsPanel from "./assignments-panel";

async function patchAssignment(assignmentId: string, action: PatchActions, data?: Record<string, string>): Promise<Assignment> {
    const res = await Patch("assignment", { action, data: { assignmentId, ...data } });
    if (res.ok) return res.json();

    const errorMessage = await res.text();
    throw new Error(errorMessage);
}

type AssignmentBoardsProps = { assignments: Assignment[]; replaceAssignment: (newAssignment: Assignment) => void };

export default function AssignmentBoards({ assignments, replaceAssignment }: AssignmentBoardsProps): JSX.Element {
    async function handleAssignmentStatusChange(dropResult: DropResult) {
        if (!dropResult.destination) return;

        const {
            source: { droppableId: currStatus },
            destination: { droppableId: newStatus },
            draggableId,
        } = dropResult;

        const actionToMatch: Partial<Record<PatchActions, boolean>> = {
            [PatchActions.START]: currStatus === AssignmentStatuses.TODO && newStatus === AssignmentStatuses.IN_PROGRESS,
            [PatchActions.FINISH]: currStatus === AssignmentStatuses.IN_PROGRESS && newStatus === AssignmentStatuses.DONE,
            // revisit
            // unstart
        };

        const matchedAction = Object.keys(actionToMatch).find((key) => !!actionToMatch[key as PatchActions]);
        if (!matchedAction) return;

        const patchedAssignment = await patchAssignment(draggableId, matchedAction as PatchActions);
        replaceAssignment(patchedAssignment);

        // if action = start, open deadline popup
    }

    function getAssignmentsByStatus(status: AssignmentStatuses) {
        return assignments.filter((a) => a.status === status);
    }

    return (
        <DragDropContext onDragEnd={handleAssignmentStatusChange}>
            <AssignmentsPanel
                flexBasis={"29%"}
                marginRight="15px"
                hiddenProps={{ smDown: true }}
                status={AssignmentStatuses.TODO}
                assignments={getAssignmentsByStatus(AssignmentStatuses.TODO)}
            />
            <AssignmentsPanel
                flexBasis={"40%"}
                flexGrow={1}
                status={AssignmentStatuses.IN_PROGRESS}
                assignments={getAssignmentsByStatus(AssignmentStatuses.IN_PROGRESS)}
            />
            <AssignmentsPanel
                flexBasis={"29%"}
                marginLeft="15px"
                hiddenProps={{ mdDown: true }}
                status={AssignmentStatuses.DONE}
                assignments={getAssignmentsByStatus(AssignmentStatuses.DONE)}
            />
        </DragDropContext>
    );
}
