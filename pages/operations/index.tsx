import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject, OperationPost } from "interfaces";
import PageLayout from "components/layouts/MainLayout";
import { withUserSession } from "utils/session";
import { DUMMY_OPERATION_POSTS } from "utils/constants/mocks";
import Panel, { PanelTitle } from "components/general/Panel";
import Timeline from "components/pages/operations/timeline";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            //minWidth: 1250,
        },
        timelineRoot: {
            flexBasis: "58%",
            maxWidth: "58%",
            //padding: "0 35px",
        },
        optionsRoot: {
            flexBasis: "20%",
            maxWidth: 350,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    });

type OperationsProps = MuiStyles & { user: UserSessionObject; posts: Array<OperationPost> };

function Operations(props: OperationsProps) {
    const { classes, user, posts } = props;

    return (
        <PageLayout user={user}>
            <div className={classes.root}>
                <Panel className={classes.optionsRoot}>
                    <PanelTitle>Sort</PanelTitle>
                    {"date written: newest first"} <br />
                    {"date written: oldest first"} <br />
                    {"date happened: newest first"} <br />
                    {"date happened: oldest first"} <br /> <br />
                    <PanelTitle>Filter</PanelTitle>
                    {"post type => all/custom"} <br />
                    {"post author => all/custom"} <br />
                    {"date range => all/custom"} <br />
                </Panel>
                <Timeline posts={posts} className={classes.timelineRoot} />
                <Panel className={classes.optionsRoot}>
                    <PanelTitle>Advanced Options</PanelTitle>
                    {"export to PDF"} <br />
                    {"calendar view"} <br /> <br />
                    <PanelTitle>Overview</PanelTitle>
                    {"X posts written"} <br />
                    {"about X posts a day"} <br />
                    {"Y burn posts, "} <br />
                    {"Z success posts..."}
                </Panel>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Operations);

export const getServerSideProps = withUserSession(async () => {
    const props: any = {};

    /* const getPosts = getAllPosts()
        .then((res) => res.json())
        .then((data) => {
            props["posts"] = data;
            return data;
        })
        .catch((e) => {
            props["posts"] = null;
            return;
        });

    await getPosts; */

    props["posts"] = DUMMY_OPERATION_POSTS;

    return { props };
});
