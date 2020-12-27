import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Hidden, { HiddenProps } from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Panel, { PanelTitle } from "src/components/general/Panel";
import { Task } from "src/utils/interfaces";
import { TaskStatuses } from "server/db/task/model";

import TaskNote from "./task/task";
import { STATUS_TO_TEXT } from "../task-utils";

type TaskPanelProps = Omit<BoxProps, "clone" | "children"> & {
    hiddenProps?: HiddenProps;
    status: TaskStatuses;
    tasks: Task[];
    showTaskInfo: (taskId: string) => void;
};

export default function TaskPanel({ hiddenProps, tasks = [], status, showTaskInfo, ...boxProps }: TaskPanelProps): JSX.Element {
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
                    {STATUS_TO_TEXT[status].toUpperCase()}
                </PanelTitle>
                <Droppable key={status} droppableId={status}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: "100%" }}>
                            <Box padding="15px" width="100% !important" margin="0px !important" clone>
                                <Grid container justify="center" spacing={2}>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(providedItem, snapshot) => (
                                                <Box height="fit-content" clone>
                                                    <Grid
                                                        item
                                                        ref={providedItem.innerRef}
                                                        {...providedItem.draggableProps}
                                                        {...providedItem.dragHandleProps}
                                                    >
                                                        <TaskNote
                                                            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
                                                            task={task}
                                                            showTaskInfo={showTaskInfo}
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
