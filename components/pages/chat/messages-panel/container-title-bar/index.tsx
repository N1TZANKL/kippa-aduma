import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { MuiStyles } from "interfaces";

import { CustomButton } from "../new-message-line";
import PanelTitle from "components/general/PanelTitle";

const styles = () =>
    createStyles({
        title: {
            pointerEvents: "none",
            userSelect: "none",
        },
    });

function ContainerTitleBar({ classes, className }: MuiStyles & { className: string }) {
    return (
        <Paper className={className}>
            <PanelTitle className={classes.title}>Group Chat</PanelTitle>
            <CustomButton icon={AttachFileIcon} title="Send File" />
        </Paper>
    );
}

export default withStyles(styles)(ContainerTitleBar);
