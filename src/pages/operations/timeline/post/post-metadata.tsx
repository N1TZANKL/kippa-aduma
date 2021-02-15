import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import clsx from "clsx";

import UserNicknameText from "src/components/general/UserNicknameText";
import { formatDate, formatTime } from "src/utils/helpers/dates";
import { MuiStyles } from "src/utils/interfaces";
import { spaceChildren } from "src/utils/helpers/css";
import { UserSessionObject } from "utils/session";
import { OperationPostTypes } from "server/db/post/model";

import PostTypeIndicator from "./post-type-indicator";

const styles = () =>
    createStyles({
        root: {
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap-reverse",
            justifyContent: "flex-end",
            //maxWidth: "70%",
        },
        metadataIcon: {
            fontSize: 16,
            marginRight: 5,
        },
        timeIcon: {
            marginLeft: 5,
        },
        authorNameText: {
            fontSize: 15,
            margin: "0 5px 2px",
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
        },
        data: spaceChildren("horizontally", 3),
        flexCenter: {
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
        },
        justifyEnd: {
            justifyContent: "flex-end",
        },
    });

type PostMetadataProps = MuiStyles & { author: UserSessionObject; writtenTimestamp: string; happenedTimestamp: string; type: OperationPostTypes };

function PostMetadata(props: PostMetadataProps) {
    const { classes } = props;

    return (
        <Typography variant="caption" color="textSecondary" className={classes.root}>
            <div className={clsx(classes.data, classes.flexCenter, classes.justifyEnd)}>
                <span className={classes.flexCenter}>
                    <CreateIcon className={classes.metadataIcon} />
                    {formatDate(props.writtenTimestamp)}
                </span>
                <span className={classes.flexCenter}>at {formatTime(props.writtenTimestamp)}</span>
                <span className={classes.flexCenter}>
                    by
                    <UserNicknameText className={classes.authorNameText} user={props.author} />
                </span>
            </div>
            <div className={clsx(classes.data, classes.flexCenter, classes.justifyEnd)}>
                <span className={classes.flexCenter}>
                    <AccessTimeIcon className={clsx(classes.metadataIcon, classes.timeIcon)} />
                    {formatDate(props.happenedTimestamp)}
                </span>
                <span>at {formatTime(props.happenedTimestamp)}</span>
            </div>
            <PostTypeIndicator type={props.type} />
        </Typography>
    );
}

export default withStyles(styles)(PostMetadata);
