import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Card from "@material-ui/core/Card";
import clsx from "clsx";

const styles = (theme: Theme) =>
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
            paddingTop: 3,
        },
        circledAvatar: {
            borderRadius: "50%",
        },
        border: { border: "2px solid white" },
    });

type UserAvatarProps = MuiStyles & { nickname: string; color: string; variant?: "circle" | "box"; size?: number; withBorder?: boolean };

function UserAvatar(props: UserAvatarProps) {
    const { classes, size } = props;

    return (
        <Card
            className={clsx(classes.root, props.variant === "circle" && classes.circledAvatar, props.withBorder && classes.border)}
            style={{ backgroundColor: props.color, width: size, height: size }}
            children={props.nickname[0]}
        />
    );
}

export default withStyles(styles)(UserAvatar);
