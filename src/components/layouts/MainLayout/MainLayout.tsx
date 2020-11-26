import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { MuiStyles } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";

import AppBar from "./components/app-bar";
import Sidebar from "./components/side-bar";

const styles = (theme: Theme) =>
    createStyles({
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
            marginLeft: 70,
            width: "100%",
            overflow: "auto",
        },
    });

type MainLayoutProps = MuiStyles & { children: React.ReactChild; noPadding?: boolean; user?: UserSessionObject };

function MainLayout({ classes, children, noPadding, user }: MainLayoutProps) {
    return (
        <div className={classes.pageRoot}>
            <AppBar user={user} />
            <div className={classes.wrapper}>
                <Sidebar />
                <Box padding={noPadding ? 0 : "20px"} clone>
                    <Paper square className={classes.childrenWrapper}>
                        {children}
                    </Paper>
                </Box>
            </div>
        </div>
    );
}

export default withStyles(styles)(MainLayout);
