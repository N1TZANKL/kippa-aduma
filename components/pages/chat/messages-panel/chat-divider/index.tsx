import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "utils/helpers/dates";

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

    return <Typography align="center" className={classes.root} children={formatDate(timestamp)} />;
}

export default withStyles(styles)(ChatDivider);
