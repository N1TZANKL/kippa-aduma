import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import { UserSessionObject, withUserSession } from "utils/session";
import PageLayout from "src/components/layouts/MainLayout";
import { MuiStyles } from "src/utils/interfaces";
import Panel from "src/components/general/Panel";
import { GreetingPanel, LatestActivitiesPanel, OverviewPanel } from "src/pages/home";
import { getAllUsers } from "server/db/user/controller";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            minHeight: 700,
            minWidth: 1250,
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
    });

type HomeProps = MuiStyles & { user: UserSessionObject; users?: UserSessionObject[] };

function Home({ classes, user, users = [] }: HomeProps): JSX.Element {
    return (
        <PageLayout user={user}>
            <div className={classes.root}>
                <div className={classes.row}>
                    <OverviewPanel className={clsx(classes.panel, classes.halfPanel)} />
                    <LatestActivitiesPanel className={clsx(classes.panel, classes.halfPanel)} />
                </div>
                <div className={classes.row}>
                    <Panel className={clsx(classes.panel, classes.sideCenterPanel)}>- WIP -</Panel>
                    <GreetingPanel user={user} users={users} className={clsx(classes.panel, classes.centerPanel)} />
                    <Panel className={clsx(classes.panel, classes.sideCenterPanel)}>- WIP -</Panel>
                </div>
                <div className={classes.row}>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>- WIP -</Panel>
                    <Panel className={clsx(classes.panel, classes.halfPanel)}>- WIP -</Panel>
                </div>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Home);

export const getServerSideProps = withUserSession(async () => {
    const props: Pick<HomeProps, "users"> = {};

    const allUsersPromise = getAllUsers()
        .then((data) => {
            props.users = data;
        })
        .catch(() => {
            props.users = undefined;
        });

    await Promise.all([allUsersPromise]);

    return { props };
});
