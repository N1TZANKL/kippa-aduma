import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

type PdfRendererProps = WithStyles<typeof styles> & { blobPath: string };

// TODO: test PDF validity

function PdfRenderer({ classes, blobPath }: PdfRendererProps) {
    return <iframe className={classes.root} src={blobPath} />;
}

export default withStyles(styles)(PdfRenderer);
