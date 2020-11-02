import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { OperationPostTypes } from "db/models/post";
import PostTypeIndicator from "./post-type-indicator";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            display: "flex",
        },
        titleText: {
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
        },
        titleDivider: {
            margin: "5px 0 5px",
        },
    });

type PostTitleProps = MuiStyles & { title: string; type: OperationPostTypes };

function PostTitle(props: PostTitleProps) {
    const { classes, title, type } = props;

    return (
        <>
            <Typography variant="subtitle2" component="div" className={classes.title}>
                <PostTypeIndicator type={type} />
                <div className={classes.titleText} children={title} />
            </Typography>
            <Divider className={classes.titleDivider} />
        </>
    );
}

export default withStyles(styles)(PostTitle);
