import React, { useState, useEffect } from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = createStyles({
    root: {
        width: "100%",
        height: "100%",
        fontFamily: "Inconsolata",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "auto",
    },
});

type TextRendererProps = WithStyles<typeof styles> & { blobPath: string };

function TextRenderer({ classes, blobPath }: TextRendererProps) {
    const [text, setText] = useState("");
    const [isError, setError] = useState(false);

    useEffect(() => {
        fetch(blobPath)
            .then((res) => res.text().then((blobText) => setText(blobText)))
            .catch(() => setError(true));
    }, [blobPath]);

    return isError ? (
        <Typography color="error" align="center">
            (Failed reading file content...)
        </Typography>
    ) : (
        <Typography className={classes.root}>{text}</Typography>
    );
}

export default withStyles(styles)(TextRenderer);
