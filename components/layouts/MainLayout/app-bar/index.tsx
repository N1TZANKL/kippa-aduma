import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Link from "next/link";

import { MuiStyles, UserSessionObject } from "interfaces";

import AccountButton from "./account-button";

const styles = (theme: Theme) => createStyles({
    appBar: {
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        backgroundColor: theme.palette.primary.dark,
        zIndex: 2,
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
    },
    currentPath: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
        marginLeft: 15,
        marginTop: 2,
    },
    logo: {
        cursor: "pointer",
        marginRight: 15,
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 2px 2px black",
    },
});

type AppBarProps = MuiStyles & { user?: UserSessionObject };

function AppBar(props: AppBarProps) {
    const { classes, user } = props;

    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <MuiAppBar color="primary" className={classes.appBar}>
            <div className={classes.wrapper}>
                <Link href="/">
                    <img alt="kippa-aduma-logo" className={classes.logo} src="/favicon.ico" />
                </Link>
                <Typography variant="h4" className={classes.title}>Kippa Aduma</Typography>
                {currentPath !== "/" && (
                    <Typography variant="h5" className={classes.currentPath}>
                        {currentPath}
                    </Typography>
                )}
            </div>
            <div className={classes.wrapper}>
                <AccountButton user={user} />
            </div>
        </MuiAppBar>
    );
}

export default withStyles(styles)(AppBar);
