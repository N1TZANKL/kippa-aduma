import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject } from "interfaces";
import PageLayout from "components/PageLayout";
import ChatBubble from "components/ChatBubble";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import UserListItem from "components/UserListItem";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { DUMMY_CHAT_MESSAGES } from "utils/constants/tests";
import { withUserSession } from "utils/session";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 1250,
            height: "100%",
            //minHeight: 600,
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
            flexBasis: "25%",
            minWidth: 300,
            padding: 15,
        },
        rightPanel: {
            flexBasis: "75%",
            minWidth: 900,
        },
        messagesContainer: {
            display: "flex",
            flexDirection: "column",
            padding: 15,
            boxSizing: "border-box",
            height: "100%",
            "& > *:not(:last-child)": {
                marginBottom: 8,
            },
        },
        usersContainer: {
            "& > *": {
                marginTop: 20,
            },
        },
        usersTitleDiv: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
            marginBottom: 3,
            borderBottom: `1px solid ${lighten(theme.constants.appBackgroundHighlight, 0.08)}`,
        },
        onlineTitle: {
            color: green["A400"],
        },
    });

type ChatProps = MuiStyles & { users: Array<UserSessionObject>; user: UserSessionObject };

function Chat(props: ChatProps) {
    const { classes, users, user } = props;

    const onlineUsersAmount = 1;
    const allUsersAmount = users.length;

    const usersListWithCurrentUserFirst = [users.find((u) => u.nickname === user.nickname), ...users.filter((u) => u.nickname !== user.nickname)];

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <Paper className={clsx(classes.panel, classes.leftPanel)}>
                    <div className={classes.usersTitleDiv}>
                        <Typography variant="caption" children={`Group Members (${allUsersAmount})`} />
                        <Typography variant="caption" children={`${onlineUsersAmount} Online`} className={classes.onlineTitle} />
                    </div>
                    <div className={classes.usersContainer}>
                        {usersListWithCurrentUserFirst.map((userData) => (
                            <UserListItem {...userData} key={userData?.username} isCurrentUser={userData?.username === user.username} />
                        ))}
                    </div>
                </Paper>
                <Paper className={clsx(classes.panel, classes.rightPanel)}>
                    <div className={classes.messagesContainer}>
                        {DUMMY_CHAT_MESSAGES.map((message) => (
                            <ChatBubble
                                message={message}
                                isCurrentUser={user.username === message.user.username}
                                key={`${message.user.username}_${message.timestamp}`}
                            />
                        ))}
                    </div>
                </Paper>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Chat);

export const getServerSideProps = withUserSession(async () => {
    const res = await fetch("http://localhost:3000/api/user/getAll");
    const users = await res.json();

    return { props: users };
});
