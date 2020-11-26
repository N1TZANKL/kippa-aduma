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

const styles = () =>
    createStyles({
        postMetadata: {
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            marginRight: 5,
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
    });

type PostMetadataProps = MuiStyles & { author: UserSessionObject; writtenTimestamp: string; happenedTimestamp: string };

function PostMetadata(props: PostMetadataProps) {
    const { classes } = props;

    return (
        <Typography variant="caption" color="textSecondary" className={classes.postMetadata}>
            <div className={clsx(classes.data, classes.flexCenter)}>
                <span className={classes.flexCenter}>
                    <CreateIcon className={classes.metadataIcon} />
                    Written {formatDate(props.writtenTimestamp)}
                </span>
                <span className={classes.flexCenter}>at {formatTime(props.writtenTimestamp)}</span>
                <span className={classes.flexCenter}>
                    by
                    <UserNicknameText className={classes.authorNameText} user={props.author} />
                </span>
            </div>
            <div className={clsx(classes.data, classes.flexCenter)}>
                <span className={classes.flexCenter}>
                    <AccessTimeIcon className={clsx(classes.metadataIcon, classes.timeIcon)} />
                    Happened {formatDate(props.happenedTimestamp)}
                </span>
                <span>at {formatTime(props.happenedTimestamp)}</span>
            </div>
        </Typography>
    );
}

export default withStyles(styles)(PostMetadata);
