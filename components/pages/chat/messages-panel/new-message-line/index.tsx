import React, { useCallback, useRef } from "react";
import {
    withStyles, Theme, createStyles, lighten,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconComponent } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/InsertEmoticon";

import { MuiStyles } from "interfaces";
import TextField from "components/general/TextField";

const styles = (theme: Theme) => createStyles({
    messageBox: {
        backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.4),
        borderRadius: 4,
        height: "60%",
        width: "100%",
        padding: "5px 10px",
        margin: "0 15px",
    },
    iconButton: {
        padding: 6,
    },
    icon: {
        color: "white",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
});

type CustomButtonProps = MuiStyles & Omit<IconButtonProps, "children"> & { icon: SvgIconComponent };
export const CustomButton = withStyles(styles)(({ classes, icon: Icon, ...props }: CustomButtonProps) => (
    <IconButton className={classes.iconButton} {...props}><Icon className={classes.icon} /></IconButton>
));

type MessageLineProps = MuiStyles & { className: string; sendMessage: (value: string) => void; };

function NewMessageLine({ classes, className, sendMessage }: MessageLineProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickSend = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputRef.current!.value);
        inputRef.current!.value = "";
    }, [sendMessage]);

    return (
        <Paper className={className}>
            <form onSubmit={onClickSend} className={classes.flex}>
                <CustomButton icon={EmojiIcon} title="Add Emoji" />
                <div className={classes.messageBox}>
                    <TextField
                        inputRef={inputRef}
                        className={classes.input}
                        focused
                        multiline
                        rowsMax={3}
                        InputProps={{ disableUnderline: true }}
                        placeholder="Write a message here..."
                    />
                </div>
                <CustomButton type="submit" icon={SendIcon} title="Send Message" />
            </form>
        </Paper>
    );
}

export default withStyles(styles)(NewMessageLine);
