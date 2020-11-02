import socketIOClient from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

import { ChatMessage, MuiStyles, UserSessionObject } from "interfaces";
import { getDatesDifference, areSameDates } from "utils/helpers/dates";

import ChatBubble from "./chat-bubble";
import NewMessageLine from "./new-message-line";
import ContainerTitleBar from "./container-title-bar";
import ChatDivider from "./chat-divider";
import Panel from "components/general/Panel";
import ScrollDownButton from "./scroll-down-button";

const styles = () =>
    createStyles({
        messagesContainer: {
            display: "flex",
            flexDirection: "column",
            padding: 25,
            boxSizing: "border-box",
            "& > *:not(:last-child)": {
                marginBottom: 8,
            },
            overflow: "auto",
            background: 'url("/favicon-blend.png") center no-repeat',
            backgroundSize: 600,
            backgroundBlendMode: "soft-light",
            flexGrow: 1,
        },
        panelContent: {
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 50px)"
        }
    });

type MessagesPanelProps = MuiStyles & { user: UserSessionObject; className: string; messages: Array<ChatMessage> };

function MessagesPanel({ classes, messages, user, className }: MessagesPanelProps) {
    const [allMessages, setMessages] = useState(messages);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Socket connection initialization
    useEffect(() => {

        const socket = socketIOClient(`http://localhost:${process.env.CHAT_PORT}`);
        socket.on("new message", onReceiveNewMessage);
        return () => {
            socket.disconnect();
        };
    }, []);

    function scrollToBottom() {
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    function isContainerScrolledToBottom(): boolean {
        if (!containerRef.current) return false;

        return (containerRef.current.scrollTop === (containerRef.current.scrollHeight - containerRef.current.offsetHeight))
    }

    function toggleScrollButtonAccordingToScrollPosition() {
        if (!containerRef.current) return;

        if (isContainerScrolledToBottom()) setShowScrollButton(false);
        else setShowScrollButton(true);
    }

    // messages container init - auto scroll bottom + scroll event listener
    useEffect(() => {
        if (containerRef.current) {
            scrollToBottom();
            containerRef.current.addEventListener("scroll", toggleScrollButtonAccordingToScrollPosition);
            return () => containerRef.current?.removeEventListener("scroll", toggleScrollButtonAccordingToScrollPosition);
        }
    }, [containerRef.current])

    function onReceiveNewMessage(newMessage: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]); // TODO: read about Mutable
    }

    function sendMessage(message: string) {
        fetch("/api/chat/postMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
        });

        scrollToBottom();
    }

    function shouldAddMarginToMessage(message: ChatMessage, prevMessage: ChatMessage | null) {
        return (
            !prevMessage ||
            !areSameDates(prevMessage.timestamp, message.timestamp) ||
            getDatesDifference(prevMessage.timestamp, message.timestamp, "minutes") > 30
        );
    }

    function shouldAddArrowToMessage(message: ChatMessage, prevMessage: ChatMessage | null) {
        return (
            !prevMessage ||
            shouldAddMarginToMessage(message, prevMessage) || // check timestamp
            prevMessage.user.username !== message.user.username
        ); // check user
    }

    function shouldShowDivider(message: ChatMessage, prevMessage: ChatMessage | null) {
        return !prevMessage || !areSameDates(prevMessage.timestamp, message.timestamp);
    }

    return (
        <Panel className={className} fullHeight>
            <ContainerTitleBar />
            <div className={classes.panelContent}>
                <div className={classes.messagesContainer} ref={containerRef}>
                    {allMessages.map((message, index) => {
                        const prevMessage = index === 0 ? null : allMessages[index - 1];

                        return (
                            <React.Fragment key={`${message.user.username}_${message.timestamp}_${index}`}>
                                {shouldShowDivider(message, prevMessage) && <ChatDivider timestamp={message.timestamp} />}
                                <ChatBubble
                                    message={message}
                                    isCurrentUser={user.username === message.user.username}
                                    withArrow={shouldAddArrowToMessage(message, prevMessage)}
                                    withMargin={shouldAddArrowToMessage(message, prevMessage)}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
                <ScrollDownButton show={showScrollButton} onClick={scrollToBottom} />
                <NewMessageLine sendMessage={sendMessage} />
            </div>
        </Panel>
    );
}

export default withStyles(styles)(MessagesPanel);
