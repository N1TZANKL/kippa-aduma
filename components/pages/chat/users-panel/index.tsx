import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject } from "interfaces";
import Paper from "@material-ui/core/Paper";
import UserListItem from "components/general/UserListItem";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
    createStyles({
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
            pointerEvents: "none",
            userSelect: "none",
        },
        onlineTitle: {
            color: green["A400"],
        },
    });

type UsersPanelProps = MuiStyles & { user: UserSessionObject; className: string; users: Array<UserSessionObject> };

function UsersPanel(props: UsersPanelProps & { users: Array<UserSessionObject> }) {
    const { classes, user, users, className } = props;

    const onlineUsersAmount = 1; // TODO: Implement user online states
    const allUsersAmount = users.length;

    const usersListWithCurrentUserFirst = [user, ...users.filter((u) => u.nickname !== user.nickname)];

    return (
        <Paper className={className}>
            <div className={classes.usersTitleDiv}>
                <Typography variant="caption" children={`Group Members (${allUsersAmount})`} />
                <Typography variant="caption" children={`${onlineUsersAmount} Online`} className={classes.onlineTitle} />
            </div>
            <div className={classes.usersContainer}>
                {usersListWithCurrentUserFirst.map((userData) => (
                    <UserListItem {...userData} key={userData.username} isCurrentUser={userData.username === user.username} />
                ))}
            </div>
        </Paper>
    );
}

export default withStyles(styles)(UsersPanel);
