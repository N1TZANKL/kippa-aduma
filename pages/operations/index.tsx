import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject, OperationPost } from "interfaces";
import PageLayout from "components/layouts/MainLayout";
import { withUserSession } from "utils/session";
import Post from "components/pages/operations/post";
import { DUMMY_OPERATION_POSTS } from "utils/constants/mocks";
import Panel, { PanelTitle } from "components/general/Panel";

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
            padding: 15,
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
        timelineContent: {
            overflowY: "auto",
            height: "calc(100% - 45px)",
            padding: "0 15px",
            marginTop: 5,
            overflowX: "hidden",
            "& > *": {
                marginTop: 15,
            },
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
                    {"search text"}
                </Panel>
                <Panel className={classes.timelineRoot}>
                    <PanelTitle>Operation Timeline</PanelTitle>
                    <div className={classes.timelineContent}>
                        {posts.map((post) => (
                            <Post post={post} key={`${post.writtenAt}_${post.author.username}`} />
                        ))}
                    </div>
                </Panel>
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
