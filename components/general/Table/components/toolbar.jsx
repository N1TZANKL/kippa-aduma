import React from 'react';
import { withStyles, createStyles, lighten } from '@material-ui/core/styles';
import {MTableToolbar} from "material-table";

const styles = (theme) => createStyles({
    root: {
        backgroundColor: lighten(theme.constants.appBackground, 0.05),
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