import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import { MuiStyles } from "src/utils/interfaces";
import Panel, { PanelTitle, PanelButton, ComingSoon } from "src/components/general/Panel";
import { UserSessionObject } from "utils/session";
import { spaceChildren } from "src/utils/helpers/css";
import UserAvatar from "src/components/general/UserAvatar";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
        },
        listWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            ...spaceChildren("horizontally", 15),
        },
        avatarWrapper: {
            marginTop: 10,
        },
    });

const AVATAR_SIZE = 42;

type UsersPanelProps = MuiStyles & { className: string; users?: UserSessionObject[] };

function UsersPanel({ classes, className, users }: UsersPanelProps) {
    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle>Campaign Team</PanelTitle>
            <div className={classes.listWrapper}>
                {users ? (
                    users.map(({ nickname, color, username, id }) => (
                        <div key={id} className={classes.avatarWrapper} title={`${nickname} ${username !== nickname ? `(${username})` : ""}`}>
                            <UserAvatar variant="circle" nickname={nickname} color={color} size={AVATAR_SIZE} />
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                        <Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                        <Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                        <Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                        <Skeleton variant="circle" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                    </>
                )}
            </div>
            <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                borderTop="1px solid rgba(255,255,255,0.1)"
                paddingTop="12px"
                marginTop="15px"
                width="100%"
            >
                <PanelButton variant="outlined" disabled={!users}>
                    Manage Users
                </PanelButton>
                <Box margin="5px 0 5px 15px" clone>
                    <ComingSoon />
                </Box>
            </Box>
        </Panel>
    );
}

export default withStyles(styles)(UsersPanel);
