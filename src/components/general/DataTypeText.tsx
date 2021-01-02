import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";

const styles = () =>
    createStyles({
        root: {
            borderRadius: 3,
            padding: "1px 8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            width: "fit-content",
            display: "inline-block",
        },
        text: {
            fontFamily: "Inconsolata",
            letterSpacing: 2,
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
        },
    });

type DataTypeTextProps = MuiStyles & TypographyProps & { children: string; className?: string };
function DataTypeText({ classes, className, children, ...typographyProps }: DataTypeTextProps) {
    return (
        <Paper className={clsx(classes.root, className)}>
            <Typography variant="body1" className={classes.text} {...typographyProps}>
                {children}
            </Typography>
        </Paper>
    );
}

export default withStyles(styles)(DataTypeText);
