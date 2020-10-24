import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

const styles = () => createStyles({
    root: {
        padding: "3px 20px",
        width: 150,
        marginTop: "35px !important",
        alignSelf: "center"
    },
    progress: {
        marginRight: 20,
        color: "white",
    },
});

type SubmitButtonProps = MuiStyles & ButtonProps & { isSubmitting: boolean };
function SubmitButton({ classes, children, className, isSubmitting, ...props }: SubmitButtonProps) {

    return <Button type="submit" color="secondary" variant="contained" className={clsx(classes.root, className)} {...props} disabled={isSubmitting}>
        {isSubmitting && <CircularProgress color="inherit" size={18} className={classes.progress} />}
        {children || "Submit!"}
    </Button>;
}

export default withStyles(styles)(SubmitButton);