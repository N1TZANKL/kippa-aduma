import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

type StyleProps = { color: string };

const useStyles = makeStyles({
    root: {
        color: "white",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontFamily: "Inconsolata",
        letterSpacing: 1.15,
        fontSize: 16,
        textTransform: "uppercase",
        backgroundColor: ({ color }: StyleProps) => color,
    },
    circledAvatar: {
        borderRadius: "50%",
    },
    border: { border: "2px solid white" },
});

type UserAvatarProps = {
    nickname: string;
    color: string;
    variant?: "circle" | "box";
    size?: number;
    withBorder?: boolean;
};

export default function UserAvatar({ size = 38, variant, withBorder, color, nickname }: UserAvatarProps): JSX.Element {
    const classes = useStyles({ color });

    return (
        <Box width={size} height={size} clone>
            <Card className={clsx(classes.root, variant === "circle" && classes.circledAvatar, withBorder && classes.border)}>{nickname[0]}</Card>
        </Box>
    );
}
