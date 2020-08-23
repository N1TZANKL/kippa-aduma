import React from "react";
import { Theme, withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontFamily: "monospace",
            marginTop: 75,
        },
        subtitle: {
            fontFamily: "monospace",
            marginTop: 25,
        },
    });

function Custom404(props: WithStyles<typeof styles>) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.title}>
                Oops! Page Not Found :(
            </Typography>
            <Typography variant="h5" className={classes.subtitle} align="center">
                The page you asked for does not exist. <br />
                Check out the other pages instead!
            </Typography>
        </div>
    );
}

export default withStyles(styles)(Custom404);
