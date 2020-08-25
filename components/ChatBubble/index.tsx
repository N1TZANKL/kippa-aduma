import React from "react";
import { withStyles, Theme, createStyles, darken } from "@material-ui/core/styles";
import { MuiStyles, ChatMessage } from "interfaces";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { grey, lightGreen, lightBlue, blue } from "@material-ui/core/colors";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import clsx from "clsx";
import { mdiFile, mdiArrowDownBold } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: "10px 10px 6px",
            backgroundColor: blue[200],
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
            color: grey[600],
            fontSize: 12,
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            textTransform: "uppercase",
        },
        fileContent: {
            cursor: "pointer",
            backgroundColor: darken(blue[200], 0.08),
            padding: 12,
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
            border: `1px solid ${grey[600]}`,
            color: grey[600],
            padding: 3,
            fontSize: 24,
            marginLeft: 10,
        },
        currentUserMessage: {
            backgroundColor: lightGreen[200],
            alignSelf: "flex-end",
            marginRight: 0,
            marginLeft: "13vw",
        },
        currentUserFileContent: {
            backgroundColor: darken(lightGreen[200], 0.08),
        },
    });

type ChatBubbleProps = MuiStyles & { message: ChatMessage };

function ChatBubble(props: ChatBubbleProps) {
    const { classes, message } = props;

    function getShortenedFilename() {
        const slicedFilename = message.message.slice(0, 25);
        if (slicedFilename === message.message) return message.message;
        else return `${slicedFilename}...`;
    }

    // check somewhere here if the message was sent by the current user,
    // and according to this info change the message background color and position
    // (left/right of the chat box)
    const currentUserNickname = "nitz"; // for testing purposes

    return (
        <Card className={clsx(classes.root, message.nickname === currentUserNickname && classes.currentUserMessage)}>
            <Typography component="div" variant="caption">
                <div className={classes.nickname} style={{ color: message.color }} children={`~${message.nickname}`} />
                {message.type === "file" ? (
                    <div
                        className={clsx(
                            classes.content,
                            classes.fileContent,
                            message.nickname === currentUserNickname && classes.currentUserFileContent
                        )}
                    >
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
