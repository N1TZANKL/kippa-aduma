import React, { useState, useEffect } from "react";
import { withStyles, Theme, createStyles, lighten, WithStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";
import Hidden from "@material-ui/core/Hidden";

import { usePopoverState } from "src/utils/hooks";
import Menu from "src/components/general/Menu";

const storageApiOptions = { apiRoot: `http://localhost:${process.env.STORAGE_PORT}` };

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
        },
        icons: { display: "flex" },
        icon: {
            fontSize: 20,
        },
        attachmentChip: {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.1),
            borderRadius: 4,
            padding: "2px 5px",
            cursor: "pointer",
        },
        attachmentChipsDiv: {
            "& > *": {
                margin: 2,
            },
            display: "flex",
            flexWrap: "wrap",
        },
    });

type StoredAttachment = {
    id: string;
    name: string;
    ancestors: { name: string }[];
};

type AttachmentChipProps = WithStyles<typeof styles> & {
    onClick: (attachmentPath: string) => void;
    attachment: StoredAttachment;
    children?: React.ReactChild;
};

const AttachmentChip = withStyles(styles)(({ classes, onClick, attachment, children }: AttachmentChipProps) => (
    <Typography
        key={attachment.id}
        title="Click for file preview"
        variant="caption"
        className={classes.attachmentChip}
        onClick={() => onClick(["", ...attachment.ancestors.map((a) => a.name).slice(1), attachment.name].join("/"))}
    >
        {children ||
            (attachment.name.length > 15 ? `${attachment.name.slice(0, 7)}...${attachment.name.slice(attachment.name.length - 7)}` : attachment.name)}
    </Typography>
));

type AttachmentsPreviewChipProps = WithStyles<typeof styles> & {
    onClickAttachment: (attachmentPath: string) => void;
    attachments: StoredAttachment[];
};

const AttachmentsPreviewChip = withStyles(styles)(({ classes, onClickAttachment, attachments }: AttachmentsPreviewChipProps) => {
    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    return (
        <>
            <Typography variant="caption" className={classes.attachmentChip} onClick={setAnchorEl} title="Click to preview attachments">
                <b>+ {attachments.length} More</b>
            </Typography>
            <Menu
                size="small"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={clearAnchorEl}
                items={attachments.map((attachment) => ({
                    title: attachment.name,
                    onClick: () => onClickAttachment(["", ...attachment.ancestors.map((a) => a.name).slice(1), attachment.name].join("/")),
                }))}
            />
        </>
    );
});

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
        <div className={classes.root}>
            <div className={classes.icons}>
                <AttachFileIcon className={classes.icon} />
                <KeyboardArrowRightIcon className={classes.icon} />
            </div>
            <div className={classes.attachmentChipsDiv}>
                <AttachmentChip attachment={attachments[0]} onClick={previewAttachment} />
                {attachments[1] && (
                    <Hidden mdDown>
                        <AttachmentChip attachment={attachments[1]} onClick={previewAttachment} />
                        {attachments.length > 2 && (
                            <AttachmentsPreviewChip attachments={attachments.slice(2)} onClickAttachment={previewAttachment} />
                        )}
                    </Hidden>
                )}
                <Hidden lgUp>
                    {attachments.length > 1 && <AttachmentsPreviewChip attachments={attachments.slice(1)} onClickAttachment={previewAttachment} />}
                </Hidden>
            </div>
        </div>
    );
}

export default withStyles(styles)(PostAttachments);
