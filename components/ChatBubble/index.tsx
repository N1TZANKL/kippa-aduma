import React from "react";
import { withStyles, Theme, createStyles, darken } from "@material-ui/core/styles";
import { MuiStyles, ChatMessage } from "interfaces";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { grey, lightBlue, blue, blueGrey } from "@material-ui/core/colors";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import clsx from "clsx";
import { mdiFile, mdiArrowDownBold } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: "10px 10px 6px",
            backgroundColor: blueGrey[200],
            width: "fit-content",
            minWidth: 150,
            margin: 3,
            marginRight: "13vw",
        },
        nickname: { fontFamily: "monospace", fontSize: 14 },
        content: {
            overflowWrap: "break-word",
            whiteSpace: "pre-line",
            color: grey[900],
            fontSize: 14,
            marginLeft: 2,
            lineHeight: 1.4,
        },
        metadata: {
            marginTop: 5,
            color: grey[700],
            fontSize: 12,
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            textTransform: "uppercase",
        },
        fileContent: {
            cursor: "pointer",
            backgroundColor: darken(blueGrey[200], 0.05),
            padding: 12,
            margin: "5px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 3,
            minWidth: 200,
        },
        basicFileIcon: {
            fontSize: 18,
            color: lightBlue[600],
            marginRight: 6,
            marginTop: 1,
        },
        flex: {
            display: "flex",
        },
        downloadButton: {
            borderRadius: "50%",
            border: `1px solid ${grey[700]}`,
            color: grey[700],
            padding: 3,
            fontSize: 24,
            marginLeft: 10,
        },
        currentUserMessage: {
            backgroundColor: blue[200],
            alignSelf: "flex-end",
            marginRight: 0,
            marginLeft: "13vw",
        },
        currentUserFileContent: {
            backgroundColor: darken(blue[200], 0.05),
        },
    });

type ChatBubbleProps = MuiStyles & { message: ChatMessage; isCurrentUser: boolean };

function ChatBubble(props: ChatBubbleProps) {
    const { classes, message, isCurrentUser } = props;

    function getShortenedFilename() {
        const slicedFilename = message.message.slice(0, 25);
        if (slicedFilename === message.message) return message.message;
        else return `${slicedFilename}...`;
    }

    return (
        <Card className={clsx(classes.root, isCurrentUser && classes.currentUserMessage)}>
            <Typography component="div" variant="caption">
                <div className={classes.nickname} style={{ color: message.user.color }} children={`~${message.user.nickname}`} />
                {message.type === "file" ? (
                    <div className={clsx(classes.content, classes.fileContent, isCurrentUser && classes.currentUserFileContent)}>
                        <div className={classes.flex}>
                            <SvgIcon className={classes.basicFileIcon}>
                                <path d={mdiFile} />
                            </SvgIcon>
                            <div title={message.message} children={getShortenedFilename()} />
                        </div>
                        <SvgIcon className={classes.downloadButton} onClick={() => undefined}>
                            <path d={mdiArrowDownBold} />
                        </SvgIcon>
                    </div>
                ) : (
                    <div className={classes.content} children={message.message} />
                )}
                <div className={classes.metadata}>
                    <div children={moment(message.timestamp).format("HH:mm")} />
                    {message.type === "file" && (
                        <div>
                            {message.fileType} &bull; {prettyBytes(message.fileSize || 0)}
                        </div>
                    )}
                </div>
            </Typography>
        </Card>
    );
}

export default withStyles(styles)(ChatBubble);
