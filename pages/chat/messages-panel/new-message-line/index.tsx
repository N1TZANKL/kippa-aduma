import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Paper from "@material-ui/core/Paper";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconComponent } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/InsertEmoticon";

const styles = (theme: Theme) =>
    createStyles({
        messageBox: {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.4),
            borderRadius: 4,
            height: "60%",
            width: "100%",
            padding: 5,
            margin: "0 15px",
        },
        iconButton: {
            padding: 6,
        },
        icon: {
            color: "white",
        },
    });

type CustomButtonProps = MuiStyles & Omit<IconButtonProps, "children"> & { icon: SvgIconComponent };
export const CustomButton = withStyles(styles)(({ classes, icon: Icon, ...props }: CustomButtonProps) => (
    <IconButton className={classes.iconButton} {...props} children={<Icon className={classes.icon} />} />
));

function NewMessageLine(props: MuiStyles & { className: string }) {
    const { classes } = props;

    return (
        <Paper className={props.className}>
            <CustomButton icon={EmojiIcon} title="Add Emoji" />
            <div className={classes.messageBox} />
            <CustomButton icon={SendIcon} title="Send Message" />
        </Paper>
    );
}

export default withStyles(styles)(NewMessageLine);
