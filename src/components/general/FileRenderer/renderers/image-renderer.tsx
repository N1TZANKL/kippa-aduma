import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
    img: {
        height: "100%",
    },
});

type ImageRendererProps = WithStyles<typeof styles> & { blobPath: string };

function ImageRenderer({ classes, blobPath }: ImageRendererProps) {
    return <img className={classes.img} alt={blobPath} src={blobPath} />;
}

export default withStyles(styles)(ImageRenderer);
