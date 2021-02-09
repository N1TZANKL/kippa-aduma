import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import ImageRenderer from "./renderers/image-renderer";
import PdfRenderer from "./renderers/pdf-renderer";
import TextRenderer from "./renderers/text-renderer";

const styles = createStyles({});

const EXTENSIONS_TO_RENDERER = new Map([
    [["pdf"], PdfRenderer],
    // [["csv", "xlsx", "xls"], "<ExcelRenderer>"],
    // [["docx", "doc"], "<WordRenderer>"],
    // video ?
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

function getRendererByExtension(ext: string) {
    for (const extArray of Array.from(EXTENSIONS_TO_RENDERER.keys())) {
        if (extArray.includes(ext)) return EXTENSIONS_TO_RENDERER.get(extArray);
    }
    return null;
}

type FileRendererProps = WithStyles<typeof styles> & { extension: string; blobPath?: string };

function FileRenderer({ classes, blobPath, extension }: FileRendererProps) {
    if (!blobPath) return "File too big. Download instead?";

    const Renderer = getRendererByExtension(extension);

    if (!Renderer) return `${extension} not supported! Download instead?`;

    return <Renderer blobPath={blobPath} />;
}

export default withStyles(styles)(FileRenderer);
