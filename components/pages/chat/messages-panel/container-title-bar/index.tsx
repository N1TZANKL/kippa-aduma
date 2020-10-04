import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { MuiStyles } from "interfaces";

import { CustomButton } from "../new-message-line";

const styles = () => createStyles({
    title: {
        fontWeight: "bold",
        fontFamily: "monospace",
        pointerEvents: "none",
        userSelect: "none",
    },
});

function ContainerTitleBar({ classes, className }: MuiStyles & { className: string }) {
    return (
        <Paper className={className}>
            <Typography variant="h5" className={classes.title}>Group Chat</Typography>
            <CustomButton icon={AttachFileIcon} title="Send File" />
        </Paper>
    );
}

export default withStyles(styles)(ContainerTitleBar);
