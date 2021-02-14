import React, { useState, useEffect } from "react";
import { withStyles, Theme, createStyles, lighten, WithStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";

import { spaceChildren } from "src/utils/helpers/css";

const storageApiOptions = { apiRoot: `http://localhost:${process.env.STORAGE_PORT}` };

const styles = (theme: Theme) =>
    createStyles({
        attachments: {
            display: "flex",
            alignItems: "center",
            ...spaceChildren("horizontally", 8),
        },
        icons: { display: "flex" },
        icon: {
            fontSize: 20,
        },
        attachmentChip: {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.1),
            borderRadius: 4,
            padding: "2px 8px",
            cursor: "pointer",
            // TODO: give max width and handle text that is too long
        },
    });

type StoredAttachment = {
    id: string;
    name: string;
    ancestors: { name: string }[];
};

type PostAttachmentsProps = WithStyles<typeof styles> & { postId: string; previewAttachment: (attachmentPath: string) => void };

function PostAttachments({ classes, postId, previewAttachment }: PostAttachmentsProps) {
    const [attachments, setAttachments] = useState<StoredAttachment[]>([]);

    useEffect(() => {
        getAttachmentsForPost();
    }, []);

    async function getAttachmentsForPost() {
        try {
            const id = await connectorNodeV1.api.getIdForPath(storageApiOptions, `/post-attachments/${postId}`);
            const postAttachments = await connectorNodeV1.api.getChildrenForId(storageApiOptions, { id });
            setAttachments(postAttachments);
        } catch (e) {
            console.error(`Failed fetching attachments for post with ID ${postId}:`, e);
        }
    }

    if (attachments.length === 0) return null;

    return (
        <div className={classes.attachments}>
            <div className={classes.icons}>
                <AttachFileIcon className={classes.icon} />
                <KeyboardArrowRightIcon className={classes.icon} />
            </div>
            {attachments.map((attachment) => (
                <Typography
                    key={attachment.id}
                    title="Click for file preview"
                    variant="caption"
                    className={classes.attachmentChip}
                    onClick={() => previewAttachment(["", ...attachment.ancestors.map((a) => a.name).slice(1), attachment.name].join("/"))}
                >
                    {attachment.name}
                </Typography>
            ))}
        </div>
    );
}

export default withStyles(styles)(PostAttachments);
