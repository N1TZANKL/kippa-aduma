import React, { useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, OperationPost } from "interfaces";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import * as muiColors from "@material-ui/core/colors";
import clsx from "clsx";
import PostAttachments from "./post-attachments";
import PostTypeIndicator, { POST_TYPE_INDICATOR_PLACEHOLDER } from "./post-type-indicator";
import PostMetadata from "./post-metadata";
import { OperationPostTypes } from "db/models/post";

type ObjectWithStringValues = { [key: string]: string };
export const PostTypeToColor: ObjectWithStringValues = {
    [OperationPostTypes.ACHIEVEMENT]: muiColors.green["A400"],
    [OperationPostTypes.RECON]: muiColors.purple["A400"],
    [OperationPostTypes.BURN]: muiColors.red["A400"],
    [OperationPostTypes.ACTION]: muiColors.amber["A400"],
    [OperationPostTypes.UPDATE]: muiColors.grey[400],
};

const styles = (theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            borderRadius: 2,
            padding: "10px 15px 15px",
            position: "relative",
            overflow: "hidden",
        },
        title: {
            display: "flex",
        },
        titleText: {
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
        },
        multilineText: {
            whiteSpace: "pre-wrap",
        },
        titleDivider: {
            margin: "5px 0 5px",
        },
        postContent: {
            lineHeight: 1.6,
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
            cursor: "pointer",
        },
        postBottomBar: {
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row-reverse",
        },
        toggleExpandText: {
            // extract this CSS to LinkText component
            color: muiColors.lightBlue["A400"],
            borderBottom: `1px solid ${muiColors.lightBlue["A400"]}`,
            width: "fit-content",
        },
        additionalInfoTitle: {
            marginTop: 15,
            fontWeight: "bold",
            color: muiColors.grey[400],
        },
        additionalInfo: {
            margin: "3px 0",
        },
        truncatedDescription: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 5,
            "-webkit-box-orient": "vertical",
        },
    });

type PostProps = MuiStyles & { post: OperationPost };

function Post(props: PostProps) {
    const [expanded, setExpanded] = useState(false);

    function _toggleExpanded() {
        setExpanded((prevState) => !prevState);
    }

    const { classes, post } = props;
    const { title, additionalInformation, attachments, type } = post;

    /* TODO: refactor? */
    const postTypeIndicator = PostTypeIndicator({ type, variant: !title ? "description" : "title" });

    return (
        <Paper className={classes.root} style={{ border: `1px solid ${PostTypeToColor[type]}` }}>
            {title && (
                <>
                    <Typography variant="subtitle2" component="div" className={classes.title}>
                        {postTypeIndicator}
                        <div className={classes.titleText} children={title} />
                    </Typography>
                    <Divider className={classes.titleDivider} />
                </>
            )}
            {/* TODO: refactor? */}
            <Typography component="div" variant="body2" className={classes.postContent} onClick={_toggleExpanded}>
                <div
                    className={clsx(classes.multilineText, !expanded && classes.truncatedDescription, !title && postTypeIndicator)}
                    children={`${!title ? POST_TYPE_INDICATOR_PLACEHOLDER : ""}${post.description}`}
                />
                {additionalInformation && !expanded && <div className={classes.toggleExpandText} children="Show More" />}
                {expanded && (
                    <>
                        <Typography variant="caption" children="Additional Information" className={classes.additionalInfoTitle} />
                        <div className={clsx(classes.multilineText, classes.additionalInfo)} children={additionalInformation} />
                        <div className={classes.toggleExpandText} children="Show Less" />
                    </>
                )}
            </Typography>
            <div className={classes.postBottomBar}>
                <PostMetadata author={post.author} writtenTimestamp={post.writtenAt} happenedTimestamp={post.happenedAt} />
                <PostAttachments attachments={attachments} />
            </div>
        </Paper>
    );
}

export default withStyles(styles)(Post);
