import React from "react";
import clsx from "clsx";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import { MuiStyles } from "src/utils/interfaces";

const styles = () =>
    createStyles({
        root: {
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
            textTransform: "uppercase",
        },
        circledAvatar: {
            borderRadius: "50%",
        },
        border: { border: "2px solid white" },
    });

type UserAvatarProps = MuiStyles & {
    nickname: string;
    color: string;
    variant?: "circle" | "box";
    size?: number;
    withBorder?: boolean;
};

function UserAvatar({ classes, size, variant, withBorder, color, nickname }: UserAvatarProps) {
    return (
        <Card
            className={clsx(classes.root, variant === "circle" && classes.circledAvatar, withBorder && classes.border)}
            style={{ backgroundColor: color, width: size, height: size }}
        >
            {nickname[0]}
        </Card>
    );
}

export default withStyles(styles)(UserAvatar);
