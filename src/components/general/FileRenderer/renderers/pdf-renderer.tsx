import React, { useEffect, useState } from "react";
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

const VALID_PDF_REGEX = new RegExp("%PDF-1.[0-7]");

type PdfRendererProps = WithStyles<typeof styles> & { blobPath: string };

function PdfRenderer({ classes, blobPath }: PdfRendererProps) {
    const [loading, setLoading] = useState(false);
    const [pdfURL, setPdfURL] = useState("");

    // on component unmount, revoke
    useEffect(() => {
        return () => {
            if (pdfURL) URL.revokeObjectURL(pdfURL);
        };
    }, []);

    useEffect(() => {
        if (pdfURL || loading || !blobPath) return;
        setLoading(true);
        fetch(blobPath)
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed loading PDF file...");

                const blob = await res.blob();

                const text = await blob.text();
                if (!text.substring(0, 8).match(VALID_PDF_REGEX)) throw new Error("PDF file is invalid!");

                const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
                setPdfURL(url);
                setLoading(false);
            })
            .catch((e) => {
                // the setState function is used in order to trigger the error boundary
                setPdfURL(() => {
                    throw new Error(e.message);
                });
            });
    }, [blobPath, loading, pdfURL]);

    return (
        <iframe className={classes.root} src={pdfURL} frameBorder="0">
            {loading && "Loading..."}
        </iframe>
    );
}

export default withStyles(styles)(PdfRenderer);
