import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import { UserSessionObject, withUserSession } from "utils/session";
import PageLayout from "src/components/layouts/MainLayout";
import { MuiStyles } from "src/utils/interfaces";
import Panel from "src/components/general/Panel";
import { GreetingPanel } from "src/pages/home";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            minHeight: 610,
            minWidth: 700,
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            flexBasis: "32%",
        },
        panel: {
            padding: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        halfPanel: {
            flexBasis: "49.5%",
        },
        centerPanel: {
            flexBasis: "40%",
            backgroundColor: theme.constants.appBackgroundHighlight,
        },
        sideCenterPanel: {
            flexBasis: "29%",
        },
        timelineRoot: {
            maxWidth: "100%",
            minWidth: "40%",
            flexGrow: 1,
        },
        optionsRoot: {
            flexBasis: "15%",
            height: "100%",
            maxWidth: 275,
            padding: 15,
            display: "flex",
            flexDirection: "column",
        },
    });

type HomeProps = MuiStyles & { user: UserSessionObject };

function Home({ classes, user }: HomeProps): JSX.Element {
    return (
        <PageLayout user={user}>
            <div className={classes.root}>
                <div className={classes.row}>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>ho</Panel>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>ho</Panel>
                </div>
                <div className={classes.row}>
                    <Panel className={clsx(classes.panel, classes.sideCenterPanel)}>ho</Panel>
                    <GreetingPanel user={user} className={clsx(classes.panel, classes.centerPanel)} />
                    <Panel className={clsx(classes.panel, classes.sideCenterPanel)}>ho</Panel>
                </div>
                <div className={classes.row}>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>ho</Panel>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>ho</Panel>
                </div>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Home);

export const getServerSideProps = withUserSession();
