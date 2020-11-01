import React from 'react';
import { withStyles, Theme, createStyles, lighten } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) => createStyles({
    content: {
        borderTop: `1px solid ${lighten(theme.constants.appBackgroundHighlight, 0.15)}`,
        paddingTop: 25,
        backgroundColor: theme.constants.appBackgroundHighlight,
    },
    actions: {
        padding: "0 15px 10px",
        backgroundColor: theme.constants.appBackgroundHighlight,
        "& > *": {
            fontWeight: "bold",
            fontFamily: "monospace",
            fontSize: 15,
            letterSpacing: 1
        }
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleText: {
        fontFamily: "monospace",
        fontWeight: "bold",
        marginLeft: 5,
    },
});

type ConfirmationDialogProps = MuiStyles & DialogProps & { onClose: () => void; onConfirm: () => void; withTitle?: boolean; confirmText?: string; denyText?: string };
function ConfirmationDialog({ classes, open, onClose, onConfirm, children, confirmText = "Confirm", denyText = "Close", withTitle = true, ...props }: ConfirmationDialogProps) {

    function confirmAndClose() {
        onConfirm();
        onClose();
    }

    return <Dialog
        open={open}
        onClose={onClose}
        {...props}
    >
        {withTitle && <DialogTitle disableTypography className={classes.title}>
            <Typography variant="h5" className={classes.titleText}>Confirm Action</Typography>
            <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </DialogTitle>}
        <DialogContent className={classes.content}>
            <DialogContentText>
                {children}
            </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
            <Button onClick={onClose}>{denyText}</Button>
            <Button onClick={confirmAndClose} color="secondary" autoFocus>{confirmText}</Button>
        </DialogActions>
    </Dialog>;
}

export default withStyles(styles)(ConfirmationDialog);