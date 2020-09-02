import React from "react";
import { withStyles, Theme, createStyles, darken } from "@material-ui/core/styles";
import { MuiStyles, ChatMessage } from "interfaces";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { grey, lightBlue, blue, blueGrey } from "@material-ui/core/colors";
import prettyBytes from "pretty-bytes";
import clsx from "clsx";
import { mdiFile, mdiArrowDownBold } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";
import { formatTime } from "utils/helpers/dates";
import cssStyles from "./ChatBubble.module.css";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: "10px 10px 6px",
            backgroundColor: blueGrey[200],
            width: "fit-content",
            minWidth: 150,
            margin: 3,
            marginRight: "13vw",
            minHeight: "fit-content",
            // arrow related CSS
            position: "relative",
            overflow: "visible",
            /* "&:after": {
                content: " ",
                position: "absolute",
                width: 0,
                height: 0,
                top: 0,
                right: -12,
                border: "7px solid",
                borderColor: `${blueGrey[200]} transparent transparent ${blueGrey[200]}`,
            }, */
        },
        nickname: {
            fontFamily: "monospace",
            fontSize: 14,
            fontWeight: "bold",
            color: blue[700],
        },
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
            maxWidth: 300,
        },
        basicFileIcon: {
            fontSize: 18,
            color: lightBlue[600],
            marginRight: 6,
            marginTop: 1,
        },
        fileContentWrapper: {
            display: "flex",
            overflow: "hidden",
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
        fileMessage: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
        },
        marginTop: { marginTop: 20 },
    });

type ChatBubbleProps = MuiStyles & { message: ChatMessage; isCurrentUser: boolean; withArrow: boolean; withMargin: boolean };

function ChatBubble(props: ChatBubbleProps) {
    const { classes, message, isCurrentUser, withArrow, withMargin } = props;

    return (
        <Card
            className={clsx(
                classes.root,
                isCurrentUser && classes.currentUserMessage,
                withArrow && cssStyles["tri-right"],
                withArrow && cssStyles[isCurrentUser ? "right-in" : "left-in"],
                withMargin && classes.marginTop
            )}
        >
            <Typography component="div" variant="caption">
                <div
                    className={classes.nickname}
                    style={{ color: isCurrentUser ? undefined : darken(message.user.color, 0.1) }}
                    children={`~${message.user.nickname}`}
                />
                {message.type === "file" ? (
                    <div className={clsx(classes.content, classes.fileContent, isCurrentUser && classes.currentUserFileContent)}>
                        <div className={classes.fileContentWrapper}>
                            <SvgIcon className={classes.basicFileIcon}>
                                <path d={mdiFile} />
                            </SvgIcon>
                            <div title={message.message} children={message.message} className={classes.fileMessage} />
                        </div>
                        <SvgIcon className={classes.downloadButton} onClick={() => undefined}>
                            <path d={mdiArrowDownBold} />
                        </SvgIcon>
                    </div>
                ) : (
                    <div className={classes.content} children={message.message} />
                )}
                <div className={classes.metadata}>
                    <div children={formatTime(message.timestamp)} />
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
