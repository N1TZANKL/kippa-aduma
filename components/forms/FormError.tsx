import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MuiStyles } from 'interfaces';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const styles = () => createStyles({
    root: {
        color: red["400"],
        fontWeight: 500,
        fontFamily: "monospace",
    },
});

type FormErrorProps = MuiStyles & TypographyProps;
function FormError({ classes, ...props }: FormErrorProps) {

    return <Typography variant="h6" className={classes.root} align="center" {...props} />
}

export default withStyles(styles)(FormError);