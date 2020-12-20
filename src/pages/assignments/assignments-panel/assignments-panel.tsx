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
        <Box {...boxProps} minHeight="400px" display="flex" flexDirection="column" clone>
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
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: "100%" }}>
                            <Box padding="15px" width="100% !important" margin="0px !important" clone>
                                <Grid container justify="center" spacing={2}>
                                    {assignments.map((assignment, index) => (
                                        <Draggable key={assignment.id} draggableId={assignment.id} index={index}>
                                            {(providedItem, snapshot) => (
                                                <Box height="fit-content" clone>
                                                    <Grid
                                                        item
                                                        ref={providedItem.innerRef}
                                                        {...providedItem.draggableProps}
                                                        {...providedItem.dragHandleProps}
                                                    >
                                                        <AssignmentNote
                                                            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
                                                            assignment={assignment}
                                                        />
                                                    </Grid>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Grid>
                            </Box>
                        </div>
                    )}
                </Droppable>
            </Panel>
        </PanelWrapper>
    );
}
