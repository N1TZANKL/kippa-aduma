import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject, ChatMessage } from "interfaces";
import PageLayout from "components/layouts/MainLayout";
import clsx from "clsx";
import { withUserSession } from "utils/session";
import UsersPanel from "components/pages/chat/users-panel";
import MessagesPanel from "components/pages/chat/messages-panel";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 1250,
            height: "calc(100% - 65px)",
            width: "100%",
            minHeight: 600,
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

export type PanelProps = MuiStyles & { user: UserSessionObject; className: string };
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

    const getAllUsers = fetch("http://localhost:3000/api/user/getAll")
        .then(res => res.json())
        .then(data => {
            props["users"] = data;
            return data;
        })
        .catch(e => {
            props["users"] = null;
            return;
        });

    const getAllMessages = fetch("http://localhost:3000/api/chat/getMessages")
        .then(res => res.json())
        .then(data => {
            props["messages"] = data;
            return data;
        })
        .catch(e => {
            props["messages"] = null;
            return;
        });

    await Promise.all([getAllUsers, getAllMessages]);

    return { props };
});
