import clsx from "clsx";
import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject, ChatMessage } from "interfaces";
import { withUserSession } from "utils/session";
import { getAllMessages } from "pages/api/chat/getMessages";
import { getAllUsers } from "pages/api/user/getAll";
import PageLayout from "components/layouts/MainLayout";
import { UsersPanel, MessagesPanel } from "components/pages/chat";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 1250,
            height: "100%",
            width: "100%",
            padding: 20,
            "& > *:not(:last-child)": {
                marginRight: 15,
            },
        },
        panel: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            borderRadius: 2,
            height: "100%",
        },
        leftPanel: {
            flexBasis: "20%",
            minWidth: 300,
            padding: 15,
            overflow: "auto",
        },
        rightPanel: {
            flexBasis: "80%",
            minWidth: 900,
            overflow: "auto",
        },
    });

type ChatProps = MuiStyles & { users: Array<UserSessionObject>; user: UserSessionObject; messages: Array<ChatMessage> };

function Chat(props: ChatProps) {
    const { classes, users, user, messages } = props;

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <UsersPanel className={clsx(classes.panel, classes.leftPanel)} user={user} users={users} />
                <MessagesPanel className={clsx(classes.panel, classes.rightPanel)} user={user} messages={messages} />
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Chat);

export const getServerSideProps = withUserSession(async () => {
    const props: any = {};

    const allUsersPromise = getAllUsers()
        .then(data => props.users = data)
        .catch(e => props.users = null);

    const allMessagesPromise = getAllMessages()
        .then(data => props.messages = data)
        .catch(e => props.messages = null);

    await Promise.all([allUsersPromise, allMessagesPromise]);

    return { props };
});
