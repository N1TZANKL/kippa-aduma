import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "./app-bar";
import Paper from "@material-ui/core/Paper";
import Sidebar from "./side-bar";
import { PageLayoutProps, UserSessionObject } from "interfaces";
import clsx from "clsx";

const styles = (theme: Theme) =>
    createStyles({
        pageRoot: {
            height: "100%",
            backgroundColor: theme.constants.appBackground,
        },
        wrapper: {
            position: "absolute",
            marginTop: 65,
            height: "inherit",
            display: "flex",
            overflow: "hidden",
        },
        childrenWrapper: {
            borderRadius: 0,
            padding: 20,
            marginLeft: 70,
        },
        noPadding: {
            padding: 0,
        },
    });

function PageLayout(props: PageLayoutProps & { noPadding?: boolean; user?: UserSessionObject }) {
    const { classes, children, noPadding, user } = props;

    return (
        <div className={classes.pageRoot}>
            <AppBar user={user} />
            <div className={classes.wrapper}>
                <Sidebar />
                <Paper className={clsx(classes.childrenWrapper, noPadding && classes.noPadding)} children={children} />
            </div>
        </div>
    );
}

export default withStyles(styles)(PageLayout);
