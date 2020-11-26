import React from "react";
import { withStyles, createStyles, Theme, lighten } from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { MuiStyles } from "src/utils/interfaces";
import IconButton from "src/components/general/IconButton";

const styles = (theme: Theme) =>
    createStyles({
        dialogPaper: {
            minWidth: 500,
            width: "calc(20% + 175px)",
            maxWidth: "80%",
        },
        title: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        titleText: {
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
            fontWeight: "bold",
            marginLeft: 5,
        },
        content: {
            padding: "15px 25px 25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.constants.appBackgroundHighlight,
            borderTop: `1px solid ${lighten(theme.constants.appBackgroundHighlight, 0.15)}`,
        },
    });

type FormDialogProps = MuiStyles & DialogProps & { title: string; onClose: () => void };
function FormDialog({ classes, title, children, open, onClose }: FormDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
            <DialogTitle disableTypography className={classes.title}>
                <Typography variant="h5" className={classes.titleText}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} fontSize={24} icon={CloseIcon} />
            </DialogTitle>
            <DialogContent className={classes.content}>{children}</DialogContent>
        </Dialog>
    );
}

export default withStyles(styles)(FormDialog);
