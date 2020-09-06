import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import { CustomButton } from "../new-message-line";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            fontFamily: "monospace",
            pointerEvents: "none",
            userSelect: "none",
        },
    });

function ContainerTitleBar(props: MuiStyles & { className: string }) {
    const { classes } = props;

    return (
        <Paper className={props.className}>
            <Typography variant="h5" children="Group Chat" className={classes.title} />
            <CustomButton icon={AttachFileIcon} title="Send File" />
        </Paper>
    );
}

export default withStyles(styles)(ContainerTitleBar);
