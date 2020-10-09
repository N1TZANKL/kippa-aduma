import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            fontWeight: "bold",
            fontFamily: "monospace",
        },
    });

type PanelTitleProps = MuiStyles & TypographyProps;

function PanelTitle(props: PanelTitleProps) {
    const { classes, className, ...otherProps } = props;

    return <Typography variant="h5" align="center" className={clsx(classes.root, className)} {...otherProps} />;
}

export default withStyles(styles)(PanelTitle);
