import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "./app-bar";
import Paper from "@material-ui/core/Paper";
import Sidebar from "./side-bar";
import { PageLayoutProps } from "interfaces";

const styles = (theme: Theme) =>
    createStyles({
        pageRoot: {
            height: "100%",
        },
        wrapper: {
            marginTop: 65,
            height: "calc(100% - 65px)",
            display: "flex",
            overflowY: "auto",
            position: "relative",
        },
        childrenWrapper: {
            borderRadius: 0,
            padding: 20,
            width: "calc(100% - 70px)",
        },
    });

function PageLayout({ classes, children }: PageLayoutProps) {
    return (
        <div className={classes.pageRoot}>
            <AppBar />
            <div className={classes.wrapper}>
                <Sidebar />
                <Paper className={classes.childrenWrapper} children={children} />
            </div>
        </div>
    );
}

export default withStyles(styles)(PageLayout);
