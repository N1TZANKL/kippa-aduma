import clsx from "clsx";
import React from "react";
import prettyBytes from "pretty-bytes";
import { mdiFile, mdiArrowDownBold } from "@mdi/js";
import { grey, lightBlue, blue, blueGrey } from "@material-ui/core/colors";
import { withStyles, createStyles, darken } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import { Emoji } from "emoji-mart";

import { MuiStyles, ChatMessage } from "src/utils/interfaces";
import { formatTime } from "src/utils/helpers/dates";
import { before, textEllipsis } from "src/utils/helpers/css";
import UserNicknameText from "src/components/general/UserNicknameText";

import cssStyles from "./ChatBubble.module.css";

const styles = () =>
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
            fontSize: 14,
            color: blue[700],
            ...before("~"),
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
        fileMessage: textEllipsis,
        marginTop: { marginTop: 20 },
    });

type ChatBubbleProps = MuiStyles & { message: ChatMessage; isCurrentUser: boolean; withArrow: boolean; withMargin: boolean };

function renderTextWithEmojis(messageText: string) {
    const handleEmojis = (messageLine: string): (string | typeof Emoji)[] => {
        const emojiRegex = /(?::[^:]+:(?::skin-tone-(?:\d):)?)/gi;
        const matches = messageLine.match(emojiRegex) || [];
        const emojiArray = matches.map((match, index) => <Emoji key={index} emoji={match} size={22} />);
        return messageLine.split(emojiRegex).reduce((prev, curr, index) => [...prev, curr, emojiArray[index]], [] as any);
    };

    return messageText.split(/\n/gi).map((messageLine, index) => (
        <div
            style={{
                display: "flex",
                alignItems: "self-end",
                whiteSpace: "pre-wrap",
            }}
            key={index}
        >
            {handleEmojis(messageLine)}
        </div>
    ));
}

function ChatBubble({ classes, message, isCurrentUser, withArrow, withMargin }: ChatBubbleProps) {
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
                <UserNicknameText user={message.user} className={classes.nickname} noUserColor={isCurrentUser} />
                {message.type === "file" ? (
                    <div className={clsx(classes.content, classes.fileContent, isCurrentUser && classes.currentUserFileContent)}>
                        <div className={classes.fileContentWrapper}>
                            <SvgIcon className={classes.basicFileIcon}>
                                <path d={mdiFile} />
                            </SvgIcon>
                            <div title={message.message} className={classes.fileMessage}>
                                {message.message}
                            </div>
                        </div>
                        <SvgIcon className={classes.downloadButton} onClick={() => undefined}>
                            <path d={mdiArrowDownBold} />
                        </SvgIcon>
                    </div>
                ) : (
                    <div className={classes.content}>{renderTextWithEmojis(message.message)}</div>
                )}
                <div className={classes.metadata}>
                    <div>{formatTime(message.timestamp)}</div>
                    {message.type === "file" && (
                        <div>
                            {message.fileType} &bull;
                            {prettyBytes(message.fileSize || 0)}
                        </div>
                    )}
                </div>
            </Typography>
        </Card>
    );
}

export default withStyles(styles)(ChatBubble);
