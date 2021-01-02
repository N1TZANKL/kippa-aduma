import React from "react";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";

import { MuiStyles } from "src/utils/interfaces";
import UserListItem from "src/components/general/UserListItem";
import Panel from "src/components/general/Panel";
import { UserSessionObject } from "utils/session";

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
            color: green.A400,
        },
    });

type UsersPanelProps = MuiStyles & { user: UserSessionObject; className: string; users?: UserSessionObject[] };

function UsersPanel({ classes, user, users, className }: UsersPanelProps) {
    // const onlineUsersAmount = 1; // TODO: Implement user online states
    const allUsersAmount = users?.length || 0;

    const usersListWithCurrentUserFirst = [user, ...(users?.filter((u) => u.nickname !== user.nickname) || [])];

    return (
        <Panel className={className} fullHeight>
            <div className={classes.usersTitleDiv}>
                <Typography variant="caption">{`Group Members (${allUsersAmount})`}</Typography>
                {/* <Typography variant="caption" className={classes.onlineTitle}>{`${onlineUsersAmount} Online`}</Typography> */}
            </div>
            <div className={classes.usersContainer}>
                {usersListWithCurrentUserFirst.map((userData) => (
                    <UserListItem {...userData} key={userData.username} isCurrentUser={userData.username === user.username} />
                ))}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(UsersPanel);
