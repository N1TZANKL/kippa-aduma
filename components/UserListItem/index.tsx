import React, { MouseEventHandler } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject } from "interfaces";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { grey, green } from "@material-ui/core/colors";
import UserAvatar from "components/UserAvatar";

const styles = (theme: Theme) =>
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
            backgroundColor: green["A400"],
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
            color: grey[500],
            fontSize: 11,
        },
    });

type UserListItemProps = MuiStyles &
    UserSessionObject & {
        isCurrentUser?: boolean;
        online?: boolean;
        onClick?: MouseEventHandler;
    };

function UserListItem(props: UserListItemProps) {
    const { classes, nickname, onClick, isCurrentUser } = props;

    return (
        <div className={clsx(classes.root, onClick && classes.clickable)} onClick={onClick}>
            <div className={classes.flex}>
                <UserAvatar color={props.color} nickname={props.nickname} />
                <div className={classes.nicknameWrapper}>
                    <Typography variant="body1" className={classes.nicknameText} children={nickname} />
                    {isCurrentUser && <Typography variant="caption" children={"\n(You)"} className={classes.userIndicator} />}
                </div>
            </div>
            {props.online || (isCurrentUser && <div className={classes.onlineIndicator} />)}
        </div>
    );
}

export default withStyles(styles)(UserListItem);
