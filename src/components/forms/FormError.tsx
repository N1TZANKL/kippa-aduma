import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { MuiStyles } from "src/utils/interfaces";

const styles = () =>
    createStyles({
        root: {
            color: red["400"],
            fontWeight: 500,
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
        },
    });

type FormErrorProps = MuiStyles & TypographyProps;
function FormError({ classes, ...props }: FormErrorProps) {
    return <Typography variant="h6" className={classes.root} align="center" {...props} />;
}

export default withStyles(styles)(FormError);
