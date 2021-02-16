import React, { useState, useEffect } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import { UserSessionObject, withUserSession } from "utils/session";
import PageLayout from "src/components/layouts/MainLayout";
import { MuiStyles } from "src/utils/interfaces";
import * as HomePanels from "src/pages/home";
import { Get } from "src/utils/helpers/api";

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
            maxHeight: "32%",
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
        shortPanel: {
            flexBasis: "40%",
            maxWidth: "40%",
        },
        longPanel: {
            flexBasis: "59%",
            maxWidth: "59%",
        },
    });

type HomeProps = MuiStyles & { user: UserSessionObject };

function Home({ classes, user }: HomeProps): JSX.Element {
    const [users, setUsers] = useState<UserSessionObject[] | undefined>(undefined);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await Get("user");
            const data = await res.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <PageLayout user={user}>
            <div className={classes.root}>
                <div className={classes.row}>
                    <HomePanels.OverviewPanel className={clsx(classes.panel, classes.shortPanel)} />
                    <HomePanels.RecentHighlightsPanel className={clsx(classes.panel, classes.longPanel)} />
                </div>
                <div className={classes.row}>
                    <HomePanels.UsersPanel className={clsx(classes.panel, classes.sideCenterPanel)} users={users} />
                    <HomePanels.GreetingPanel user={user} users={users} className={clsx(classes.panel, classes.centerPanel)} />
                    <HomePanels.LatestActivitiesPanel className={clsx(classes.panel, classes.sideCenterPanel)} />
                </div>
                <div className={classes.row}>
                    <HomePanels.TasksPanel className={clsx(classes.panel, classes.longPanel)} />
                    <HomePanels.MilestonesPanel className={clsx(classes.panel, classes.shortPanel)} />
                </div>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Home);

export const getServerSideProps = withUserSession();
