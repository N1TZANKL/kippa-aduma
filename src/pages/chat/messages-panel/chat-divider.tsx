import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { MuiStyles } from "src/utils/interfaces";
import { formatDate } from "src/utils/helpers/dates";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            paddingBottom: 5,
            borderBottom: `1px solid ${lighten(theme.constants.appBackgroundHighlight, 0.45)}`,
            color: lighten(theme.constants.appBackgroundHighlight, 0.45),
            fontFamily: "monospace",
            pointerEvents: "none",
            userSelect: "none",
        },
    });

type ChatDividerProps = MuiStyles & { timestamp: string };

function ChatDivider(props: ChatDividerProps) {
    const { classes, timestamp } = props;

    return (
        <Typography align="center" className={classes.root}>
            {formatDate(timestamp)}
        </Typography>
    );
}

export default withStyles(styles)(ChatDivider);
