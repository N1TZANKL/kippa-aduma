import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, OperationPost } from "interfaces";
import Paper from "@material-ui/core/Paper";
import * as muiColors from "@material-ui/core/colors";
import PostMetadata from "./post-metadata";
import { OperationPostTypes } from "db/models/post";
import PostTitle from "./post-title";
import PostContent from "./post-content";

type ObjectWithStringValues = { [key: string]: string };
export const PostTypeToColor: ObjectWithStringValues = {
    [OperationPostTypes.SUCCESS]: muiColors.green["A400"],
    [OperationPostTypes.RECON]: muiColors.cyan["A400"],
    [OperationPostTypes.BURN]: muiColors.red["A400"],
    [OperationPostTypes.ACTION]: muiColors.amber["A400"],
    [OperationPostTypes.UPDATE]: muiColors.grey[400],
};

const styles = (theme: Theme) =>
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
            {title && <PostTitle title={title} type={type} />}
            <PostContent post={post} />
            <div className={classes.postBottomBar}>
                <PostMetadata author={post.author} writtenTimestamp={post.writtenAt} happenedTimestamp={post.happenedAt} />
            </div>
        </Paper>
    );
}

export default withStyles(styles)(Post);
