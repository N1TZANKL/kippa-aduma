import clsx from "clsx";
import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { ChatMessage, MuiStyles, UserSessionObject } from "interfaces";
import Paper from "@material-ui/core/Paper";

import { getDatesDifference, areSameDates } from "utils/helpers/dates";

import ChatBubble from "./chat-bubble";
import NewMessageLine from "./new-message-line";
import ContainerTitleBar from "./container-title-bar";
import ChatDivider from "./chat-divider";

const styles = (theme: Theme) =>
    createStyles({
        base: {
            borderRadius: 0,
            overflow: "hidden",
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.08),
        },
        containerTitle: {
            height: 50,
            display: "flex",
            alignItems: "center",
            padding: "0 10px 0 20px",
            justifyContent: "space-between",
        },
        messageLine: {
            height: 65,
            //minHeight: 65,
            //maxHeight: 200,
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
        },
        messagesContainer: {
            display: "flex",
            flexDirection: "column",
            padding: 25,
            boxSizing: "border-box",
            height: "calc(100% - 115px)",
            maxHeight: "calc(100% - 115px)",
            "& > *:not(:last-child)": {
                marginBottom: 8,
            },
            overflow: "auto",
            backgroundImage: 'url("/favicon-blend.png")',
            backgroundSize: 600,
            backgroundBlendMode: "soft-light",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundColor: theme.constants.appBackgroundHighlight,
        },
    });

type MessagesPanelProps = MuiStyles & { user: UserSessionObject; className: string; messages: Array<ChatMessage> };

function MessagesPanel(props: MessagesPanelProps) {
    const { classes, messages, user, className } = props;

    const [allMessages, setMessages] = useState(messages);

    useEffect(() => {
        const socket = socketIOClient(`http://localhost:${"1337" /* process.env.CHAT_PORT */}`); //TODO: fix
        socket.on("new message", _onReceiveNewMessage);
        return () => {
            socket.disconnect();
        };
    }, []);

    function _onReceiveNewMessage(newMessage: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]); //TODO: read about Mutable
    }

    function _sendMessage(message: string) {
        fetch("/api/chat/postMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
        });
    }

    function _shouldAddMarginToMessage(message: ChatMessage, prevMessage: ChatMessage | null) {
        if (!prevMessage) return true;

        if (!areSameDates(prevMessage.timestamp, message.timestamp)) return true;

        if (getDatesDifference(prevMessage.timestamp, message.timestamp, "minutes") > 30) return true;
        else return false;
    }

    function _shouldAddArrowToMessage(message: ChatMessage, prevMessage: ChatMessage | null) {
        if (!prevMessage) return true;

        // check timestamp
        if (_shouldAddMarginToMessage(message, prevMessage)) return true;

        // check user
        if (prevMessage.user.username !== message.user.username) return true;

        return false;
    }

    function _shouldShowDivider(message: ChatMessage, prevMessage: ChatMessage | null) {
        if (!prevMessage) return true;

        if (!areSameDates(prevMessage.timestamp, message.timestamp)) return true;
        else return false;
    }

    return (
        <Paper className={className}>
            <ContainerTitleBar className={clsx(classes.base, classes.containerTitle)} />
            <div className={classes.messagesContainer}>
                {allMessages.map((message, index) => {
                    const prevMessage = index === 0 ? null : allMessages[index - 1];

                    return (
                        <React.Fragment key={`${message.user.username}_${message.timestamp}_${index}`}>
                            {_shouldShowDivider(message, prevMessage) && <ChatDivider timestamp={message.timestamp} />}
                            <ChatBubble
                                message={message}
                                isCurrentUser={user.username === message.user.username}
                                withArrow={_shouldAddArrowToMessage(message, prevMessage)}
                                withMargin={_shouldAddArrowToMessage(message, prevMessage)}
                            />
                        </React.Fragment>
                    );
                })}
            </div>
            <NewMessageLine className={clsx(classes.base, classes.messageLine)} sendMessage={_sendMessage} />
        </Paper>
    );
}

export default withStyles(styles)(MessagesPanel);
