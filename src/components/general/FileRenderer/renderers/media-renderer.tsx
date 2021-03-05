import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const styles = createStyles({
    rootFF: {
        width: "-moz-available",
    },
    rootChrome: {
        width: "-webkit-fill-available",
    },
});

type MediaRendererProps = WithStyles<typeof styles> & { blobPath: string };

function MediaRenderer({ classes, blobPath }: MediaRendererProps): JSX.Element {
    return (
        <video controls className={clsx(classes.rootFF, classes.rootChrome)}>
            <source src={blobPath} type={"video/mp4"} />
        </video>
    );
}

export default withStyles(styles)(MediaRenderer);
