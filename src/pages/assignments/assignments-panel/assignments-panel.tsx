import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Hidden, { HiddenProps } from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Panel, { PanelTitle } from "src/components/general/Panel";
import { Assignment } from "src/utils/interfaces";
import { AssignmentStatuses } from "server/db/assignment/model";
import { assignmentStatusToTitle } from "src/pages/assignments";

import AssignmentNote from "./assignment/assignment";

type AssignmentPanelProps = Omit<BoxProps, "clone" | "children"> & {
    hiddenProps?: HiddenProps;
    status: AssignmentStatuses;
    assignments: Assignment[];
};

export default function AssignmentPanel({ hiddenProps, assignments = [], status, ...boxProps }: AssignmentPanelProps): JSX.Element {
    const BasePanelWrapper = ({ children }: { children: React.ReactChild }) => (
        <Box minHeight="400px" {...boxProps} clone>
            {children}
        </Box>
    );

    const PanelWrapper = ({ children }: { children: React.ReactChild }) =>
        hiddenProps ? (
            <Hidden {...hiddenProps}>
                <BasePanelWrapper>{children}</BasePanelWrapper>
            </Hidden>
        ) : (
            <BasePanelWrapper>{children}</BasePanelWrapper>
        );

    return (
        <PanelWrapper>
            <Panel>
                <PanelTitle padding={"3px"} withBackground>
                    {assignmentStatusToTitle[status].toUpperCase()}
                </PanelTitle>
                <Droppable key={status} droppableId={status}>
                    {(provided) => (
                        <Box padding="15px" clone>
                            <Grid container justify="center" {...provided.droppableProps} ref={provided.innerRef} spacing={2}>
                                {assignments.map((assignment, index) => (
                                    <Draggable key={assignment.id} draggableId={assignment.id} index={index}>
                                        {(providedItem, snapshot) => (
                                            <Grid item ref={providedItem.innerRef} {...providedItem.draggableProps} {...providedItem.dragHandleProps}>
                                                <AssignmentNote
                                                    isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
                                                    assignment={assignment}
                                                />
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        </Box>
                    )}
                </Droppable>
            </Panel>
        </PanelWrapper>
    );
}
