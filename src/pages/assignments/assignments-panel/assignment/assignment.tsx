import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import TodoIcon from "@material-ui/icons/Schedule";
import InProgressIcon from "@material-ui/icons/Timer";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

import { Assignment, MuiStyles } from "src/utils/interfaces";

import { AssignmentStatuses } from "server/db/assignment/model";
import { formatDate, getDatesDifference } from "src/utils/helpers/dates";
import { SvgIconComponent } from "@material-ui/icons";
import AssignmentCard from "./assignment-card";

const styles = createStyles({
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
        //borderTop: `2px solid ${red[700]}`,
        borderBottom: `3px solid ${red[700]}`,
        color: "white",
        width: "fit-content",
        padding: "0 3px 2px 0",
    },
});

type AssignmentNoteProps = MuiStyles & { assignment: Assignment; isBeingDragged: boolean };

const assignmentStatusToTimestampTitle: Record<AssignmentStatuses, string> = {
    [AssignmentStatuses.TODO]: "Created At",
    [AssignmentStatuses.IN_PROGRESS]: "Started At",
    [AssignmentStatuses.DONE]: "Finished At",
};

const assignmentStatusToIconTimestamp: Record<
    AssignmentStatuses,
    { icon: SvgIconComponent; timestampKey: "changedAt" | "deadlineAt"; timestampText: string }
> = {
    [AssignmentStatuses.TODO]: { icon: TodoIcon, timestampKey: "changedAt", timestampText: "Created" },
    [AssignmentStatuses.IN_PROGRESS]: { icon: InProgressIcon, timestampKey: "deadlineAt", timestampText: "Deadline" },
    [AssignmentStatuses.DONE]: { icon: DoneIcon, timestampKey: "changedAt", timestampText: "Finished" },
};

function AssignmentNote({ classes, assignment, isBeingDragged }: AssignmentNoteProps) {
    const { description, status, assignee, deadlineAt } = assignment;

    const { icon: AssignmentIcon, timestampKey, timestampText } = assignmentStatusToIconTimestamp[status];

    const deadlinePassed = deadlineAt && getDatesDifference(deadlineAt, new Date(), "day") > 0;

    return (
        <AssignmentCard status={status} description={description} isBeingDragged={isBeingDragged} userColor={assignee?.color}>
            <Typography
                variant="caption"
                color="textSecondary"
                className={clsx(
                    classes.timestampDiv,
                    status === AssignmentStatuses.IN_PROGRESS && classes.progressTimestamp,
                    deadlinePassed && classes.deadlinePassed
                )}
            >
                <AssignmentIcon fontSize="small" /> <span className={classes.timestampText}>{timestampText}:</span>{" "}
                <span className={classes.timestampText}>{formatDate(assignment[timestampKey])}</span>
            </Typography>
        </AssignmentCard>
    );
}

export default withStyles(styles)(AssignmentNote);
