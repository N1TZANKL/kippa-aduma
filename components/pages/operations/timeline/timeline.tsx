import React, { useMemo, useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import { MuiStyles, OperationPost } from "interfaces";
import Panel from "components/general/Panel";
import { notLastChild, spaceChildren } from "utils/helpers/css";
import { NotFoundAnimation } from "components/animations";
import { OperationPostTypes } from "db/models/post";

import Post from "./post";
import TimelineTopBar from "./timeline-top-bar";
import { SortOptions, SortOptionsToFunction } from "../sort-filter-panel";

const styles = (theme: Theme) =>
    createStyles({
        timelineContent: {
            overflowY: "auto",
            height: "calc(100% - 50px)",
            overflowX: "hidden",
            ...notLastChild({
                margin: 25,
            }),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        timelineBottomIndicator: {
            backgroundColor: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            ...spaceChildren("horizontally", 5),
        },
        clickable: { cursor: "pointer" },
        noMorePosts: {
            fontStyle: "italic",
            color: "rgba(255,255,255,0.5)",
        },
        postsWrapper: {
            ...spaceChildren("vertically", 15),
            display: "flex",
            flexDirection: "column",
        },
        noPostsFoundWrapper: {
            padding: 25,
            alignSelf: "center",
        },
    });

type PostTimelineProps = MuiStyles & {
    posts: Array<OperationPost>;
    className: string;
    currentSort: SortOptions;
    postTypeFilters: Array<OperationPostTypes> | null;
    addPost: Function;
};
function PostsTimeline(props: PostTimelineProps) {
    const { classes, className, posts, addPost, currentSort, postTypeFilters } = props;

    const [shownPosts, setShownPosts] = useState<number>(5);
    const [searchString, setSearchString] = useState<string>("");

    function _showMorePosts() {
        setShownPosts((prevState) => prevState + 5);
    }

    function _filterPostsBySearchString(postsToFilter: Array<OperationPost>) {
        if (!searchString) return postsToFilter;

        // filter all the string values of post object and check whether at least one matches the search string
        return postsToFilter.filter((post) => Object.values(post).some((p: any) => p && typeof p === "string" && p.match(searchString)));
    }

    function _filterPosts() {
        // shown + match search string + match post type filter
        return _filterPostsBySearchString(posts.filter((post: OperationPost) => !postTypeFilters || postTypeFilters.includes(post.type)));
    }

    function _sortPosts(postsToSort: Array<OperationPost>): Array<OperationPost> {
        return SortOptionsToFunction[currentSort](postsToSort);
    }

    const filteredPosts = useMemo(() => _filterPosts(), [posts, shownPosts, searchString, currentSort, postTypeFilters]);

    return (
        <Panel className={className}>
            <TimelineTopBar onSearch={setSearchString} addPost={addPost} />
            <div className={classes.timelineContent}>
                <div className={classes.postsWrapper}>
                    {filteredPosts.length > 0 ? (
                        _sortPosts(filteredPosts)
                            .slice(0, shownPosts)
                            .map((post: OperationPost) => <Post post={post} key={`${post.writtenAt}_${post.author.username}`} />)
                    ) : (
                        <div className={classes.noPostsFoundWrapper}>
                            <NotFoundAnimation message={`No${posts.length > 0 ? " matching" : ""} posts found`} />
                        </div>
                    )}
                </div>
                {filteredPosts.length > 0 && (
                    <>
                        {shownPosts < filteredPosts.length ? (
                            <Typography
                                variant="subtitle1"
                                className={clsx(classes.timelineBottomIndicator, classes.clickable)}
                                onClick={_showMorePosts}
                            >
                                <ExpandMoreIcon /> <span>Show More Posts</span>
                            </Typography>
                        ) : (
                            <Typography variant="subtitle1" className={clsx(classes.timelineBottomIndicator, classes.noMorePosts)}>
                                No More Posts to Show
                            </Typography>
                        )}
                    </>
                )}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(PostsTimeline);
