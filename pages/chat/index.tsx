import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import PageLayout from "components/PageLayout";
import ChatBubble from "components/ChatBubble";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import UserListItem from "components/UserListItem";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { ALL_USERS, CURRENT_USER_NICKNAME, DUMMY_CHAT_MESSAGES } from "utils/constants/tests";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 1250,
            height: "100%",
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
                marginTop: 12,
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

function Chat(props: MuiStyles) {
    const { classes } = props;

    const ONLINE_PEEPS_AMOUNT = 1;
    const ALL_PEEPS_AMOUNT = 2;

    const usersListWithCurrentUserFirst = [
        ALL_USERS.find(u => u.nickname === CURRENT_USER_NICKNAME),
        ...ALL_USERS.filter(u => u.nickname !== CURRENT_USER_NICKNAME),
    ].filter(Boolean);

    return (
        <PageLayout noPadding>
            <div className={classes.root}>
                <Paper className={clsx(classes.panel, classes.leftPanel)}>
                    <div className={classes.usersTitleDiv}>
                        <Typography variant="caption" children={`Group Members (${ALL_PEEPS_AMOUNT})`} />
                        <Typography variant="caption" children={`${ONLINE_PEEPS_AMOUNT} Online`} className={classes.onlineTitle} />
                    </div>
                    <div className={classes.usersContainer}>
                        {usersListWithCurrentUserFirst.map(user => (
                            <UserListItem {...user} key={user.nickname} />
                        ))}
                    </div>
                </Paper>
                <Paper className={clsx(classes.panel, classes.rightPanel)}>
                    <div className={classes.messagesContainer}>
                        {DUMMY_CHAT_MESSAGES.map(message => (
                            <ChatBubble message={message} key={`${message.nickname}_${message.timestamp}`} />
                        ))}
                    </div>
                </Paper>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Chat);
