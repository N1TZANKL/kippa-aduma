import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import { PageLayoutProps, UserSessionObject } from "interfaces";

import AppBar from "./app-bar";
import Sidebar from "./side-bar";

const styles = (theme: Theme) => createStyles({
    pageRoot: {
        height: "100%",
        backgroundColor: theme.constants.appBackground,
    },
    wrapper: {
        position: "absolute",
        marginTop: 65,
        height: "calc(100% - 65px)",
        display: "flex",
        overflow: "hidden",
        width: "100%",
    },
    childrenWrapper: {
        borderRadius: 0,
        padding: 20,
        marginLeft: 70,
        width: "100%",
    },
    noPadding: {
        padding: 0,
    },
});

function PageLayout({
    classes, children, noPadding, user,
}: PageLayoutProps & { noPadding?: boolean; user?: UserSessionObject }) {
    return (
        <div className={classes.pageRoot}>
            <AppBar user={user} />
            <div className={classes.wrapper}>
                <Sidebar />
                <Paper className={clsx(classes.childrenWrapper, noPadding && classes.noPadding)}>
                    {children}
                </Paper>
            </div>
        </div>
    );
}

export default withStyles(styles)(PageLayout);
