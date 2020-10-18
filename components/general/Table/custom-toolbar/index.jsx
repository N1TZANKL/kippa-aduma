import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {MTableToolbar} from "material-table";

const styles = (theme) => createStyles({
    root: {
        boxShadow: "inset 1px 1px 25px rgba(255,255,255,0.15)",
        borderBottom: `2px solid ${theme.constants.appBackground}`,
        paddingRight: 15
    }
});

function CustomToolbar(props) {

    const { classes, ...otherProps } = props;

    return <div className={classes.root}>
        <MTableToolbar {...otherProps} showTextRowsSelected={false} />
    </div>;
}

export default withStyles(styles)(CustomToolbar);