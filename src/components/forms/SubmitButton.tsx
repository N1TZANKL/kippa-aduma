import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";

const styles = () =>
    createStyles({
        root: {
            width: 150,
            alignSelf: "center",
        },
        progress: {
            marginRight: 20,
            color: "white",
        },
        margin: { marginTop: "35px !important" },
    });

type SubmitButtonProps = MuiStyles & ButtonProps & { isSubmitting: boolean };
function SubmitButton({ classes, children, className, isSubmitting, ...props }: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            className={clsx(classes.root, classes.margin, className)}
            {...props}
            disabled={isSubmitting}
        >
            {isSubmitting && <CircularProgress color="inherit" size={18} className={classes.progress} />}
            {children || "Submit!"}
        </Button>
    );
}

export default withStyles(styles)(SubmitButton);
