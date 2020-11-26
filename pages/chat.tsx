import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import { MuiStyles, ChatMessage } from "src/utils/interfaces";
import { withUserSession, UserSessionObject } from "utils/session";
import { getChatMessages } from "server/db/message/controller";
import { getAllUsers } from "server/db/user/controller";
import PageLayout from "src/components/layouts/MainLayout";
import { UsersPanel, MessagesPanel } from "src/pages/chat";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 800,
            minHeight: 400,
            height: "100%",
            width: "100%",
            padding: 20,
            "& > *:not(:last-child)": {
                marginRight: 15,
            },
        },
        leftPanel: {
            flexBasis: "20%",
            minWidth: 300,
            padding: 15,
            overflow: "auto",
        },
        rightPanel: {
            flexBasis: "100%",
            position: "relative",
            overflow: "hidden",
        },
    });

type ChatProps = MuiStyles & { users?: UserSessionObject[]; user: UserSessionObject; messages?: ChatMessage[] };

function Chat({ classes, users, user, messages }: ChatProps) {
    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <Hidden mdDown implementation="css">
                    <UsersPanel className={classes.leftPanel} user={user} users={users} />
                </Hidden>
                <MessagesPanel className={classes.rightPanel} user={user} messages={messages} />
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Chat);

export const getServerSideProps = withUserSession(async () => {
    const props: Omit<ChatProps, "user" | "classes"> = {};

    const allUsersPromise = getAllUsers()
        .then((data) => {
            props.users = data;
        })
        .catch(() => {
            props.users = undefined;
        });

    const allMessagesPromise = getChatMessages()
        .then((data) => {
            props.messages = data;
        })
        .catch(() => {
            props.messages = undefined;
        });

    await Promise.all([allUsersPromise, allMessagesPromise]);

    return { props };
});
