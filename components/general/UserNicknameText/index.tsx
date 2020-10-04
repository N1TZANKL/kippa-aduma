import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";

import { UserSessionObject } from "interfaces";

type StyleProps = { color: string | undefined; };

const useStyles = makeStyles({
    root: {
        fontWeight: "bold",
        fontFamily: "monospace",
        color: (props: StyleProps) => props.color,
    },
});

type UserNicknameTextProps = Omit<TypographyProps, "children"> & {
    user: UserSessionObject;
    noUserColor?: boolean;
    className?: string
};

export default function UserNicknameText({
    user, noUserColor, className, ...typographyProps
}: UserNicknameTextProps): React.ReactElement {
    const classes = useStyles({ color: noUserColor ? undefined : darken(user.color, 0.1) });

    return (
        <Typography
            variant="body1"
            title={`${user.nickname} (${user.username})`}
            {...typographyProps}
            className={clsx(classes.root, className)}
        >
            {user.nickname}
        </Typography>
    );
}
