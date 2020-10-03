import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject } from "interfaces";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "utils/helpers/dates";
import UserNicknameText from "components/general/UserNicknameText";
import CreateIcon from "@material-ui/icons/Create";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";

const styles = (theme: Theme) =>
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
    });

type PostMetadataProps = MuiStyles & { author: UserSessionObject; writtenTimestamp: string; happenedTimestamp: string };

function PostMetadata(props: PostMetadataProps) {
    const { classes } = props;

    return (
        <Typography variant="caption" className={classes.postMetadata}>
            <CreateIcon className={classes.metadataIcon} /> Written {formatDate(props.writtenTimestamp, true)} by
            <UserNicknameText className={classes.authorNameText} user={props.author} />
            <AccessTimeIcon className={clsx(classes.metadataIcon, classes.timeIcon)} /> Happened {formatDate(props.happenedTimestamp, true)}
        </Typography>
    );
}

export default withStyles(styles)(PostMetadata);
