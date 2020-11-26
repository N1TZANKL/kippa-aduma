import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";

import { MuiStyles, OperationPost } from "src/utils/interfaces";
import PageLayout from "src/components/layouts/MainLayout";
import { withUserSession, UserSessionObject } from "utils/session";
import Timeline from "src/pages/operations/timeline";
import SortFilterPanel, { SortOptions } from "src/pages/operations/sort-filter-panel";
import AdvancedOverviewPanel from "src/pages/operations/advanced-overview-panel";
import { OperationPostTypes } from "server/db/post/model";
import { getAllPosts } from "server/db/post/controller";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            minHeight: 610,
            minWidth: 700,
            padding: 15,
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
        sortPanel: {
            marginRight: 15,
        },
        overviewPanel: {
            marginLeft: 15,
        },
    });

type OperationsProps = MuiStyles & { user: UserSessionObject; posts?: OperationPost[] };

function Operations(props: OperationsProps) {
    const { classes, user, posts } = props;

    const [allPosts, setPosts] = useState<OperationPost[]>(posts || []);

    const sortState = useState<SortOptions>(SortOptions.WrittenDesc);
    const postTypeFiltersState = useState<OperationPostTypes[] | null>(null);

    function addPost(newPost: OperationPost) {
        setPosts((prevState) => [...prevState, newPost]);
    }

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <Hidden smDown implementation="css">
                    <SortFilterPanel
                        className={clsx(classes.optionsRoot, classes.sortPanel)}
                        sortState={sortState}
                        postTypeFiltersState={postTypeFiltersState}
                    />
                </Hidden>
                <Timeline
                    posts={allPosts}
                    addPost={addPost}
                    className={classes.timelineRoot}
                    currentSort={sortState[0]}
                    postTypeFilters={postTypeFiltersState[0]}
                />
                <Hidden mdDown implementation="css">
                    <AdvancedOverviewPanel className={clsx(classes.optionsRoot, classes.overviewPanel)} posts={allPosts} />
                </Hidden>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Operations);

export const getServerSideProps = withUserSession(async () => {
    const props: Omit<OperationsProps, "user" | "classes"> = {};

    const getPosts = getAllPosts()
        .then((data) => {
            props.posts = data;
            return data;
        })
        .catch(() => {
            props.posts = undefined;
        });

    await getPosts;

    return { props };
});
