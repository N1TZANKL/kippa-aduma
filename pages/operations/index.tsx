import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

import { MuiStyles, UserSessionObject, OperationPost } from "interfaces";
import PageLayout from "components/layouts/MainLayout";
import { withUserSession } from "utils/session";
import Timeline from "components/pages/operations/timeline";
import SortFilterPanel, { SortOptions } from "components/pages/operations/sort-filter-panel";
import AdvancedOverviewPanel from "components/pages/operations/advanced-overview-panel";
import { OperationPostTypes } from "db/post/model";
import { getAllPosts } from "db/post/controller";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            // minWidth: 1250,
        },
        timelineRoot: {
            flexBasis: "58%",
            maxWidth: "58%",
            // padding: "0 35px",
        },
        optionsRoot: {
            flexBasis: "20%",
            maxWidth: 350,
            padding: "15px 25px",
            display: "flex",
            flexDirection: "column",
        },
    });

type OperationsProps = MuiStyles & { user: UserSessionObject; posts?: OperationPost[] };

function Operations(props: OperationsProps) {
    const { classes, user, posts } = props;

    const [allPosts, setPosts] = useState<OperationPost[]>(posts || []);

    const sortState = useState<SortOptions>(SortOptions.WRITTEN_DESC);
    const postTypeFiltersState = useState<OperationPostTypes[] | null>(null);

    function addPost(newPost: OperationPost) {
        setPosts((prevState) => [...prevState, newPost]);
    }

    return (
        <PageLayout user={user}>
            <div className={classes.root}>
                <SortFilterPanel className={classes.optionsRoot} sortState={sortState} postTypeFiltersState={postTypeFiltersState} />
                <Timeline
                    posts={allPosts}
                    addPost={addPost}
                    className={classes.timelineRoot}
                    currentSort={sortState[0]}
                    postTypeFilters={postTypeFiltersState[0]}
                />
                <AdvancedOverviewPanel className={classes.optionsRoot} posts={allPosts} />
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
