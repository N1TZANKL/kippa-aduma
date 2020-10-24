import React from 'react';
import { withStyles, createStyles, Theme, lighten } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
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
        fontFamily: "monospace",
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
    closeButton: {
        padding: 4,
        fontSize: 24,
    }
});

type FormDialogProps = MuiStyles & DialogProps & { title: string; onClose: () => void };
function FormDialog({ classes, title, children, open, onClose }: FormDialogProps) {

    return <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
        <DialogTitle disableTypography className={classes.title}>
            <Typography variant="h5" className={classes.titleText}>{title}</Typography>
            <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </DialogTitle>
        <DialogContent className={classes.content}>
            {children}
        </DialogContent>
    </Dialog>;
}

export default withStyles(styles)(FormDialog);