import React from "react";
import { withTheme, lighten, makeStyles, WithTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { AssignmentStatuses } from "server/db/assignment/model";

import cssStyles from "./Assignment.module.css";

type StyleProps = { color: string; isBeingDragged: boolean };

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 215,
        maxWidth: 215,
        height: 150,
        maxHeight: 150,
        position: "relative",
        padding: 20,
        backgroundColor: ({ color, isBeingDragged }: StyleProps) => lighten(color, isBeingDragged ? 0.35 : 0.25),
        "&:hover": {
            backgroundColor: ({ color }: StyleProps) => lighten(color, 0.35),
        },
        "&:focus": {
            outline: "none",
        },
        transform: ({ isBeingDragged }: StyleProps) => (isBeingDragged ? "rotate(3deg)" : "none"),
        boxShadow: ({ isBeingDragged }: StyleProps) => (isBeingDragged ? "0 0 5px 3px rgba(255,255,255,0.7)" : "none"),
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
});

type AssignmentCardProps = WithTheme & {
    description: string;
    status: AssignmentStatuses;
    userColor?: string;
    isBeingDragged: boolean;
    children?: React.ReactChild | null;
};

function AssignmentCard({ theme, description, status, userColor = "black", isBeingDragged, children }: AssignmentCardProps) {
    const classes = useStyles({
        color: status === AssignmentStatuses.TODO ? theme.constants.appBackground : userColor,
        isBeingDragged,
    });

    return (
        <Paper square elevation={isBeingDragged ? 8 : 2} className={clsx(classes.root, cssStyles.triangle)}>
            <Typography variant="body2">{description}</Typography>
            <div>{children}</div>
        </Paper>
    );
}

export default withTheme(AssignmentCard);
