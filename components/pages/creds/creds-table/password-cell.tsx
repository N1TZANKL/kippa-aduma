import React, { useState, useMemo } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = () => createStyles({
    root: {
        display: "flex",
        alignItems: "center",
        //justifyContent: "center"
    },
    toggleButton: {
        fontSize: 22,
        padding: 3,
        marginRight: 6
    },
});

type PasswordCellProps = MuiStyles & { password: string };
function PasswordCell({ classes, password }: PasswordCellProps) {

    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

    const togglePasswordShown = () => setPasswordShown(prevState => !prevState);

    const IconComponent = useMemo(() => isPasswordShown ? VisibilityOffIcon : VisibilityIcon, [isPasswordShown]);
    const title = useMemo(() => isPasswordShown ? "Hide Password" : "Show Password", [isPasswordShown]);

    return <div className={classes.root}>
        <IconButton color="secondary" onClick={togglePasswordShown} className={classes.toggleButton} title={title}>
            <IconComponent fontSize="inherit" />
        </IconButton>
        {isPasswordShown ? password : "•".repeat(password.length)}
    </div>;
}

export default withStyles(styles)(PasswordCell);