import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { MuiStyles } from "interfaces";
import IconButton from "components/general/IconButton";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            " & > button": {
                marginRight: 8,
            },
        },
    });

type PasswordCellProps = MuiStyles & { password: string };
function PasswordCell({ classes, password }: PasswordCellProps) {
    const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

    const togglePasswordShown = () => setPasswordShown((prevState) => !prevState);

    const IconComponent = isPasswordShown ? VisibilityOffIcon : VisibilityIcon;
    const title = isPasswordShown ? "Hide Password" : "Show Password";

    return (
        <div className={classes.root}>
            <IconButton color="secondary" onClick={togglePasswordShown} title={title} icon={IconComponent} fontSize={22} p={3} />
            {isPasswordShown ? password : "•".repeat(password.length)}
        </div>
    );
}

export default withStyles(styles)(PasswordCell);
