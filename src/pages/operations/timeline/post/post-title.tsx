import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { MuiStyles } from "src/utils/interfaces";

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

type PostTitleProps = MuiStyles & { title: string };

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
