import React from 'react';
import { withStyles, Theme, createStyles, lighten } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        bottom: 80,
        right: 25,
        backgroundColor: theme.constants.appBackgroundHighlight,
        color: lighten(theme.constants.appBackgroundHighlight, 0.4),
        "&:hover": {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.08)
        }
    }
});

type ScrollDownButtonProps = MuiStyles & { onClick: () => void, show: boolean };
function ScrollDownButton({ classes, onClick, show }: ScrollDownButtonProps) {

    return <Grow in={show} mountOnEnter unmountOnExit>
        <Fab size="small" className={classes.root} onClick={onClick}>
            <ArrowDownIcon />
        </Fab>
    </Grow>;
}

export default withStyles(styles)(ScrollDownButton);