import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Hidden, { HiddenProps } from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Panel, { PanelTitle } from "src/components/general/Panel";
import AssignmentNote from "./assignment/assignment";
import { Assignment } from "src/utils/interfaces";
import { AssignmentStatuses } from "server/db/assignment/model";
import { assignmentStatusToTitle } from "src/pages/assignments";

type AssignmentPanelProps = Omit<BoxProps, "clone" | "children"> & {
    hiddenProps?: HiddenProps;
    status: AssignmentStatuses;
    assignments: Assignment[];
};

export default function AssignmentPanel({ hiddenProps, assignments = [], status, ...boxProps }: AssignmentPanelProps) {
    const BasePanelWrapper = ({ children }: { children: React.ReactChild }) => (
        <Box {...boxProps} clone>
            {children}
        </Box>
    );

    let PanelWrapper = BasePanelWrapper;

    if (hiddenProps) {
        PanelWrapper = ({ children }) => (
            <Hidden {...hiddenProps}>
                <BasePanelWrapper>{children}</BasePanelWrapper>
            </Hidden>
        );
    }

    return (
        <PanelWrapper>
            <Panel fullHeight>
                <PanelTitle padding={"3px"} withBackground>
                    {assignmentStatusToTitle[status].toUpperCase()}
                </PanelTitle>
                <Droppable key={status} droppableId={status}>
                    {(provided) => (
                        <Box padding="15px" clone>
                            <Grid container justify="center" {...provided.droppableProps} ref={provided.innerRef} spacing={2}>
                                {assignments.map((assignment, index) => (
                                    <Draggable key={assignment.id} draggableId={assignment.id} index={index}>
                                        {(provided, snapshot) => (
                                            <Grid item {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <AssignmentNote
                                                    isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
                                                    assignment={assignment}
                                                />
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Droppable>
            </Panel>
        </PanelWrapper>
    );
}
