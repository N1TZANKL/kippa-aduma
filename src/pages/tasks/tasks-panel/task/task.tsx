import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

import { Task, MuiStyles } from "src/utils/interfaces";
import { TaskStatuses } from "server/db/task/model";
import { formatDate, getDatesDifference } from "src/utils/helpers/dates";
import UserAvatar from "src/components/general/UserAvatar";

import TaskCard from "./task-card";
import { STATUS_TO_ICON, STATUS_TO_DISPLAYED_TIMESTAMP } from "../../task-utils";

const styles = createStyles({
    content: {
        lineHeight: 1.75,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
    avatar: {
        display: "inline-block",
        marginRight: 5,
    },
    timestampDiv: {
        display: "flex",
        alignItems: "center",
        marginTop: 10,
    },
    timestampText: {
        marginLeft: 5,
        fontStyle: "italic",
    },
    progressTimestamp: {
        fontWeight: "bold",
    },
    deadlinePassed: {
        // borderTop: `2px solid ${red[700]}`,
        borderBottom: `3px solid ${red[700]}`,
        color: "white",
        width: "fit-content",
        padding: "0 3px 2px 0",
    },
});

type TaskNoteProps = MuiStyles & { task: Task; isBeingDragged: boolean; showTaskInfo: (taskId: string) => void };

function TaskNote({ classes, task, isBeingDragged, showTaskInfo }: TaskNoteProps) {
    const { description, status, assignee, deadlineAt } = task;

    const { timestampKey, timestampText } = STATUS_TO_DISPLAYED_TIMESTAMP[status];
    const TaskIcon = STATUS_TO_ICON[status];

    const deadlinePassed = status === TaskStatuses.IN_PROGRESS && deadlineAt && getDatesDifference(deadlineAt, new Date(), "day") > 0;

    const timestamp = task[timestampKey];

    return (
        <TaskCard isBeingDragged={isBeingDragged} onClick={() => showTaskInfo(task.id)} title="Click for more information">
            <Typography variant="body2" component="div" className={classes.content}>
                {assignee && (
                    <div className={classes.avatar}>
                        <UserAvatar {...assignee} variant="circle" size={25} />
                    </div>
                )}
                {description}
            </Typography>
            <Typography
                variant="caption"
                color="textSecondary"
                component="div"
                className={clsx(
                    classes.timestampDiv,
                    status === TaskStatuses.IN_PROGRESS && classes.progressTimestamp,
                    deadlinePassed && classes.deadlinePassed
                )}
            >
                <TaskIcon fontSize="small" /> <span className={classes.timestampText}>{timestampText}:</span>{" "}
                <span className={classes.timestampText}>{formatDate(timestamp) || "(Not set)"}</span>
            </Typography>
        </TaskCard>
    );
}

export default withStyles(styles)(TaskNote);
