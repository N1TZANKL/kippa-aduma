import React, { useState, useEffect } from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { ChatMessage } from "interfaces";
import { PanelProps } from "..";
import Paper from "@material-ui/core/Paper";
import ChatBubble from "components/ChatBubble";
import socketIOClient from "socket.io-client";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import NewMessageLine from "./new-message-line";
import ContainerTitleBar from "./container-title-bar";

const styles = (theme: Theme) =>
    createStyles({
        base: {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.08),
            borderRadius: 0,
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
            padding: 15,
            boxSizing: "border-box",
            height: "calc(100% - 115px)",
            "& > *:not(:last-child)": {
                marginBottom: 8,
            },
            overflow: "auto",
        },
    });

function MessagesPanel(props: PanelProps & { messages: Array<ChatMessage> }) {
    const { classes, messages, user, className } = props;

    const [allMessages, setMessages] = useState(messages);

    useEffect(() => {
        const socket = socketIOClient(`http://localhost:${process.env.CHAT_PORT}`); // TODO: save socket with useRef
        socket.on("receive message", _onReceiveNewMessage);
        return () => {
            socket.disconnect();
        };
    }, []);

    function _onReceiveNewMessage(newMessage: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]); //TODO: read about Mutable
    }

    function _sendMessage(message: string) {
        const newMessageObj = { type: "text", message, user };
        // send message
    }

    return (
        <Paper className={className}>
            <ContainerTitleBar className={clsx(classes.base, classes.containerTitle)} />
            <div className={classes.messagesContainer}>
                {allMessages.map((message) => (
                    <ChatBubble
                        message={message}
                        isCurrentUser={user.username === message.user.username}
                        key={`${message.user.username}_${message.timestamp}`}
                    />
                ))}
            </div>
            <NewMessageLine className={clsx(classes.base, classes.messageLine)} />
        </Paper>
    );
}

export default withStyles(styles)(MessagesPanel);
