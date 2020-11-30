import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Assignment } from "src/utils/interfaces";
import { AssignmentStatuses } from "server/db/assignment/model";

import AssignmentsPanel from "./assignments-panel";

type AssignmentBoardsProps = { assignments: Assignment[] };

export default function AssignmentBoards({ assignments }: AssignmentBoardsProps): JSX.Element {
    function handleAssignmentStatusChange({ draggableId, destination, source }: DropResult) {
        console.log(draggableId, destination, source);
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
