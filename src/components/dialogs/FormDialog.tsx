import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

import { MuiStyles } from "src/utils/interfaces";

import DialogBase, { DialogBaseProps } from "../general/DialogBase";

const styles = (theme: Theme) =>
    createStyles({
        content: {
            padding: "15px 25px 25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.constants.appBackgroundHighlight,
        },
    });

type FormDialogProps = MuiStyles & DialogBaseProps;

function FormDialog({ classes, children, ...dialogProps }: FormDialogProps) {
    return (
        <DialogBase {...dialogProps}>
            <DialogContent className={classes.content}>{children}</DialogContent>
        </DialogBase>
    );
}

export default withStyles(styles)(FormDialog);
