import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { MuiStyles } from "src/utils/interfaces";

import DialogBase, { DialogBaseProps } from "../general/DialogBase";

const styles = (theme: Theme) =>
    createStyles({
        content: {
            paddingTop: 25,
            backgroundColor: theme.constants.appBackgroundHighlight,
        },
        actions: {
            padding: "0 15px 10px",
            backgroundColor: theme.constants.appBackgroundHighlight,
            "& > *": {
                fontWeight: "bold",
                fontFamily: "Inconsolata",
                letterSpacing: 1.15,
                fontSize: 15,
            },
        },
    });

type ConfirmationDialogProps = MuiStyles & Omit<DialogBaseProps, "title"> & { onConfirm: () => void; confirmText?: string; denyText?: string };

function ConfirmationDialog(props: ConfirmationDialogProps) {
    const { classes, onConfirm, children, confirmText = "Confirm", denyText = "Close", ...dialogProps } = props;

    function confirmAndClose() {
        onConfirm();
        props.onClose();
    }

    return (
        <DialogBase title="Confirm Action" {...dialogProps}>
            <DialogContent className={classes.content}>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={props.onClose}>{denyText}</Button>
                <Button onClick={confirmAndClose} color="secondary" autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </DialogBase>
    );
}

export default withStyles(styles)(ConfirmationDialog);
