import React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { OperationPost } from "src/utils/interfaces";

import PostMetadata from "./post-metadata";
import PostTitle from "./post-title";
import PostContent from "./post-content";
import PostAttachments from "./post-attachments";
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

type PostProps = WithStyles<typeof styles> & { post: OperationPost; previewAttachment: (attachmentPath: string) => void };

function Post({ classes, post, previewAttachment }: PostProps) {
    const { title, type } = post;

    return (
        <Box border={`1px solid ${PostTypeToColor[type]}`} clone>
            <Paper className={classes.root}>
                {title ? <PostTitle title={title} /> : null}
                <PostContent post={post} />
                <div className={classes.postBottomBar}>
                    <PostMetadata type={type} author={post.author} writtenTimestamp={post.writtenAt} happenedTimestamp={post.happenedAt} />
                    <PostAttachments postId={post.id} previewAttachment={previewAttachment} />
                </div>
            </Paper>
        </Box>
    );
}

export default withStyles(styles)(Post);
