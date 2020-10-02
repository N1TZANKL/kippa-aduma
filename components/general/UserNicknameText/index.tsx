import React from "react";
import { withStyles, Theme, createStyles, darken } from "@material-ui/core/styles";
import { MuiStyles, UserSessionObject } from "interfaces";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            fontWeight: "bold",
            fontFamily: "monospace",
        },
    });

type UserNicknameTextProps = MuiStyles & { user: UserSessionObject; noUserColor?: boolean; className?: string } & Omit<TypographyProps, "children">;

function UserNicknameText(props: UserNicknameTextProps) {
    const { classes, user, noUserColor, className, ...typographyProps } = props;

    return (
        <Typography
            variant="body1"
            title={`${user.nickname} (${user.username})`}
            {...typographyProps}
            children={user.nickname}
            style={{ color: noUserColor ? undefined : darken(user.color, 0.1) }}
            className={clsx(classes.root, className)}
        />
    );
}

export default withStyles(styles)(UserNicknameText);
