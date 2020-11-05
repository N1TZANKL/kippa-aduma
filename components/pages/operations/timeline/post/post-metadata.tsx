import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";

import UserNicknameText from "components/general/UserNicknameText";
import { formatDate, formatTime } from "utils/helpers/dates";
import { MuiStyles, UserSessionObject } from "interfaces";
import { spaceChildren } from "utils/helpers/css";

const styles = () =>
    createStyles({
        postMetadata: {
            fontStyle: "italic",
            color: grey[400],
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
        <Typography variant="caption" className={classes.postMetadata}>
            <div className={clsx(classes.data, classes.flexCenter)}>
                <span className={classes.flexCenter}>
                    <CreateIcon className={classes.metadataIcon} />
                    Written {formatDate(props.writtenTimestamp)}
                </span>
                <span>at {formatTime(props.writtenTimestamp)}</span>
                <span>
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
