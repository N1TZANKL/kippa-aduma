import clsx from "clsx";
import React, { MouseEventHandler } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

import { MuiStyles, UserSessionObject } from "interfaces";
import UserAvatar from "src/components/general/UserAvatar";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        clickable: {
            cursor: "pointer",
        },
        firstLetterBox: {
            color: "white",
            borderRadius: 3,
            height: 38,
            width: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontFamily: "monospace",
            fontSize: 16,
            paddingTop: 3,
        },
        onlineIndicator: {
            backgroundColor: green.A400,
            width: 8,
            height: 8,
            borderRadius: "50%",
            marginRight: 5,
        },
        flex: {
            display: "flex",
            alignItems: "center",
        },
        nicknameWrapper: {
            marginLeft: 12,
        },
        nicknameText: {
            /* whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis", */
            lineHeight: 1.1,
        },
        userIndicator: {
            fontSize: 11,
            pointerEvents: "none",
            userSelect: "none",
        },
    });

type UserListItemProps = MuiStyles &
    UserSessionObject & {
        isCurrentUser?: boolean;
        online?: boolean;
        onClick?: MouseEventHandler;
    };

function UserListItem({ classes, online, color, nickname, onClick, isCurrentUser }: UserListItemProps) {
    return (
        <div className={clsx(classes.root, onClick && classes.clickable)} onClick={onClick}>
            <div className={classes.flex}>
                <UserAvatar color={color} nickname={nickname} />
                <div className={classes.nicknameWrapper}>
                    <Typography variant="body1" className={classes.nicknameText}>
                        {nickname}
                    </Typography>
                    {isCurrentUser ? (
                        <Typography color="textSecondary" variant="caption" className={classes.userIndicator}>
                            {"\n(You)"}
                        </Typography>
                    ) : null}
                </div>
            </div>
            {online || isCurrentUser ? <div className={classes.onlineIndicator} /> : null}
        </div>
    );
}

export default withStyles(styles)(UserListItem);
