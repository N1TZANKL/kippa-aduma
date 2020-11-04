import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import { MuiStyles } from "interfaces";
import { spaceChildren } from "utils/helpers/css";
import { OperationPostAttachment } from "db/models/post";

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
            // TODO: give max width and handle text that is too long
        },
    });

type PostAttachmentsProps = MuiStyles & { attachments: Array<OperationPostAttachment> };

function PostAttachments(props: PostAttachmentsProps) {
    const { classes, attachments } = props;

    if (attachments.length === 0) return;

    return (
        <div className={classes.attachments}>
            <div className={classes.icons}>
                <AttachFileIcon className={classes.icon} />
                <KeyboardArrowRightIcon className={classes.icon} />
            </div>
            {attachments.map((attachment) => (
                <div key={attachment} className={classes.attachmentChip}>
                    {attachment}
                </div>
            ))}
        </div>
    );
}

export default withStyles(styles)(PostAttachments);
