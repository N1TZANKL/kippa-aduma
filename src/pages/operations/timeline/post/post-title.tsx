import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = () =>
    createStyles({
        title: {
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginRight: 15,
        },
        titleDivider: {
            margin: "5px 0 5px",
        },
    });

type PostTitleProps = WithStyles<typeof styles> & { title: string };

function PostTitle({ classes, title }: PostTitleProps) {
    return (
        <>
            <Typography variant="subtitle2" component="div" className={classes.title}>
                {title}
            </Typography>
            <Divider className={classes.titleDivider} />
        </>
    );
}

export default withStyles(styles)(PostTitle);
