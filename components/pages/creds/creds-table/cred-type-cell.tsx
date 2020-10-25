import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import { CredentialTypes } from 'db/models/cred';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
    root: {
        borderRadius: 3,
        padding: "1px 8px",
        backgroundColor: "rgba(255,255,255,0.1)",
        width: "fit-content",
    },
    text: {
        letterSpacing: 1,
        fontFamily: "monospace",
        textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
    }
});

type CredTypeCellProps = MuiStyles & { type: CredentialTypes };
function CredTypeCell({ classes, type }: CredTypeCellProps) {

    return <Paper className={classes.root}>
        <Typography variant="body1" className={classes.text}>{type}</Typography>
    </Paper>;
}

export default withStyles(styles)(CredTypeCell);