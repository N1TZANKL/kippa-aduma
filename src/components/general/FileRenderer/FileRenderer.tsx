import React from "react";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import DownloadIcon from "@material-ui/icons/GetApp";

import ImageRenderer from "./renderers/image-renderer";
import PdfRenderer from "./renderers/pdf-renderer";
import TextRenderer from "./renderers/text-renderer";
import MediaRenderer from "./renderers/media-renderer";

const styles = createStyles({
    downloadButton: {
        fontSize: 120,
        cursor: "pointer",
    },
    text: {
        fontStyle: "italic",
        fontFamily: "Inconsolata",
        marginBottom: 25,
    },
});

const EXTENSIONS_TO_RENDERER = new Map<string[], React.ElementType<{ blobPath: string }>>([
    [["pdf"], PdfRenderer],
    // [["csv", "xlsx", "xls"], "<ExcelRenderer>"],
    // [["docx", "doc"], "<WordRenderer>"],
    [["mp4"], MediaRenderer],
    [["png", "jpg", "jpeg", "webp", "ico", "gif"], ImageRenderer],
    [
        [
            "txt",
            "sh",
            "bat",
            "json",
            "js",
            "jsx",
            "ts",
            "tsx",
            "html",
            "css",
            "scss",
            "py",
            "rb",
            "cs",
            "config",
            "log",
            "yml",
            "csv", // excel renderer?
            "md", // markdown renderer?
        ],
        TextRenderer,
    ],
]);

function getRendererByExtension(ext: string): React.ElementType<{ blobPath: string }> | null {
    let renderer = null;
    Array.from(EXTENSIONS_TO_RENDERER.keys()).some((extArray) => {
        if (extArray.includes(ext)) {
            renderer = EXTENSIONS_TO_RENDERER.get(extArray);
            return true;
        }
        return false;
    });
    return renderer;
}

function downloadFile(blobPath: string, filename: string) {
    const link = document.createElement("a");
    link.href = blobPath;
    link.style.display = "none";
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

type FileRendererProps = WithStyles<typeof styles> & { filename: string; blobPath: string };

function FileRenderer({ classes, blobPath, filename }: FileRendererProps) {
    const extension = filename.split(".").reverse()[0];
    const Renderer = getRendererByExtension(extension);

    if (!Renderer)
        return (
            <>
                <Typography align="center" className={classes.text} variant="h5">
                    Extension .{extension} not supported :( <br /> Download instead?
                </Typography>
                <div title="Click to download">
                    <DownloadIcon className={classes.downloadButton} onClick={() => downloadFile(blobPath, filename)} />
                </div>
            </>
        );

    return <Renderer blobPath={blobPath} />;
}

export default withStyles(styles)(FileRenderer);
