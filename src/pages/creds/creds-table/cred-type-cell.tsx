import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { MuiStyles } from "src/utils/interfaces";
import { CredentialTypes } from "server/db/cred/model";

const styles = () =>
    createStyles({
        root: {
            borderRadius: 3,
            padding: "1px 8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            width: "fit-content",
        },
        text: {
            fontFamily: "Inconsolata",
            letterSpacing: 2,
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
        },
    });

type CredTypeCellProps = MuiStyles & { type: CredentialTypes };
function CredTypeCell({ classes, type }: CredTypeCellProps) {
    return (
        <Paper className={classes.root}>
            <Typography variant="body1" className={classes.text}>
                {type}
            </Typography>
        </Paper>
    );
}

export default withStyles(styles)(CredTypeCell);
