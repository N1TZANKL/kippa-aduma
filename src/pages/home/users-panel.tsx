import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import { MuiStyles } from "src/utils/interfaces";
import { repeatElement } from "src/utils/helpers/jsx";
import Panel, { PanelTitle, PanelButton, ComingSoon } from "src/components/general/Panel";
import { UserSessionObject } from "utils/session";
import { spaceChildren } from "src/utils/helpers/css";
import UserAvatar from "src/components/general/UserAvatar";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
        },
        flexWrap: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
        },
        listWrapper: {
            ...spaceChildren("horizontally", 15),
        },
        avatarWrapper: {
            marginTop: 10,
        },
        manageButtonWrapper: {
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 15,
            paddingTop: 12,
            width: "100%",
        },
    });

const AVATAR_SIZE = 42;

type UsersPanelProps = MuiStyles & { className: string; users?: UserSessionObject[] };

function UsersPanel({ classes, className, users }: UsersPanelProps) {
    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle>Campaign Team</PanelTitle>
            <div className={clsx(classes.flexWrap, classes.listWrapper)}>
                {users ? (
                    users.map(({ nickname, color, username, id }) => (
                        <div key={id} className={classes.avatarWrapper} title={`${nickname} ${username !== nickname ? `(${username})` : ""}`}>
                            <UserAvatar variant="circle" nickname={nickname} color={color} size={AVATAR_SIZE} />
                        </div>
                    ))
                ) : (
                    <>{repeatElement(<Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />, 5)}</>
                )}
            </div>
            <div className={clsx(classes.flexWrap, classes.manageButtonWrapper)}>
                <PanelButton variant="outlined" disabled={!users}>
                    Manage Users
                </PanelButton>
                <Box margin="5px 0 5px 15px" clone>
                    <ComingSoon />
                </Box>
            </div>
        </Panel>
    );
}

export default withStyles(styles)(UsersPanel);
