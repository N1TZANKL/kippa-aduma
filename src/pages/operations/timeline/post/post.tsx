import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { MuiStyles, OperationPost } from "src/utils/interfaces";

import PostMetadata from "./post-metadata";
import PostTitle from "./post-title";
import PostContent from "./post-content";
import { PostTypeToColor } from "./post-type-indicator";

const styles = () =>
    createStyles({
        root: {
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            padding: "10px 15px 15px",
            position: "relative",
            overflow: "hidden",
        },
        postBottomBar: {
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row-reverse",
        },
    });

type PostProps = MuiStyles & { post: OperationPost };

function Post(props: PostProps) {
    const { classes, post } = props;
    const { title, type } = post;

    return (
        <Paper className={classes.root} style={{ border: `1px solid ${PostTypeToColor[type]}` }}>
            {title ? <PostTitle title={title} type={type} /> : null}
            <PostContent post={post} />
            <div className={classes.postBottomBar}>
                <PostMetadata author={post.author} writtenTimestamp={post.writtenAt} happenedTimestamp={post.happenedAt} />
            </div>
        </Paper>
    );
}

export default withStyles(styles)(Post);
