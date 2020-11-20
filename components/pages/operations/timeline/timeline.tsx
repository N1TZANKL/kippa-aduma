import React, { useCallback, useMemo, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import { MuiStyles, OperationPost } from "interfaces";
import Panel from "components/general/Panel";
import { notLastChild, spaceChildren } from "utils/helpers/css";
import { NotFoundAnimation } from "components/animations";
import { OperationPostTypes } from "db/post/model";

import Post from "./post";
import TimelineTopBar from "./timeline-top-bar";
import { SortOptions, SortOptionsToFunction } from "../sort-filter-panel";

const styles = () =>
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

const POSTS_PER_PAGE = 5;

type PostTimelineProps = MuiStyles & {
    posts: Array<OperationPost>;
    className: string;
    currentSort: SortOptions;
    postTypeFilters: Array<OperationPostTypes> | null;
    addPost: (newPost: OperationPost) => void;
};
function PostsTimeline(props: PostTimelineProps) {
    const { classes, className, posts, addPost, currentSort, postTypeFilters } = props;

    const [shownPosts, setShownPosts] = useState<number>(POSTS_PER_PAGE);
    const [searchString, setSearchString] = useState<string>("");

    function showMorePosts() {
        setShownPosts((prevState) => prevState + POSTS_PER_PAGE);
    }

    const filterPostsBySearchString = useCallback(
        (postsToFilter: Array<OperationPost>) => {
            if (!searchString) return postsToFilter;

            // filter all the string values of post object and check whether at least one matches the search string
            return postsToFilter.filter((post) => Object.values(post).some((p: unknown) => p && typeof p === "string" && p.match(searchString)));
        },
        [searchString]
    );

    function sortPosts(postsToSort: Array<OperationPost>): Array<OperationPost> {
        return SortOptionsToFunction[currentSort](postsToSort);
    }

    const filteredPosts = useMemo(() => {
        // shown + match search string + match post type filter
        return filterPostsBySearchString(posts.filter((post: OperationPost) => !postTypeFilters || postTypeFilters.includes(post.type)));
    }, [posts, postTypeFilters, filterPostsBySearchString]);

    return (
        <Panel className={className}>
            <TimelineTopBar onSearch={setSearchString} addPost={addPost} />
            <div className={classes.timelineContent}>
                <div className={classes.postsWrapper}>
                    {filteredPosts.length > 0 ? (
                        sortPosts(filteredPosts)
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
                                onClick={showMorePosts}
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
