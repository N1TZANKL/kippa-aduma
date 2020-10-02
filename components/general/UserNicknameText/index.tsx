import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { UserSessionObject } from "interfaces";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
        fontWeight: "bold",
        fontFamily: "monospace",
        color: (props: any) => props.color,
    },
});

type UserNicknameTextProps = { user: UserSessionObject; noUserColor?: boolean; className?: string } & Omit<TypographyProps, "children">;

export default function UserNicknameText(props: UserNicknameTextProps) {
    const { user, noUserColor, className, ...typographyProps } = props;

    const classes = useStyles({ color: noUserColor ? undefined : darken(user.color, 0.1) });

    return (
        <Typography
            variant="body1"
            title={`${user.nickname} (${user.username})`}
            {...typographyProps}
            children={user.nickname}
            className={clsx(classes.root, className)}
        />
    );
}
