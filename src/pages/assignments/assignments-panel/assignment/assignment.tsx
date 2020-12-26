import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

import { Assignment, MuiStyles } from "src/utils/interfaces";
import { AssignmentStatuses } from "server/db/assignment/model";
import { formatDate, getDatesDifference } from "src/utils/helpers/dates";
import UserAvatar from "src/components/general/UserAvatar";

import AssignmentCard from "./assignment-card";
import { STATUS_TO_ICON, STATUS_TO_DISPLAYED_TIMESTAMP } from "../../assignment-utils";

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

type AssignmentNoteProps = MuiStyles & { assignment: Assignment; isBeingDragged: boolean; showAssignmentInfo: (assignmentId: string) => void };

function AssignmentNote({ classes, assignment, isBeingDragged, showAssignmentInfo }: AssignmentNoteProps) {
    const { description, status, assignee, deadlineAt } = assignment;

    const { timestampKey, timestampText } = STATUS_TO_DISPLAYED_TIMESTAMP[status];
    const AssignmentIcon = STATUS_TO_ICON[status];

    const deadlinePassed = status === AssignmentStatuses.IN_PROGRESS && deadlineAt && getDatesDifference(deadlineAt, new Date(), "day") > 0;

    const timestamp = assignment[timestampKey];

    return (
        <AssignmentCard isBeingDragged={isBeingDragged} onClick={() => showAssignmentInfo(assignment.id)} title="Click for more information">
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
                className={clsx(
                    classes.timestampDiv,
                    status === AssignmentStatuses.IN_PROGRESS && classes.progressTimestamp,
                    deadlinePassed && classes.deadlinePassed
                )}
            >
                {timestamp && (
                    <>
                        <AssignmentIcon fontSize="small" /> <span className={classes.timestampText}>{timestampText}:</span>{" "}
                        <span className={classes.timestampText}>{formatDate(assignment[timestampKey])}</span>
                    </>
                )}
            </Typography>
        </AssignmentCard>
    );
}

export default withStyles(styles)(AssignmentNote);
