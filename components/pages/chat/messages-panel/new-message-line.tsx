import React, { useCallback, useEffect, useRef, useState } from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconComponent } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/InsertEmoticon";
import { MuiStyles } from "interfaces";
import TextField from "components/general/TextField";
import { PanelBottomBar } from "components/general/Panel";
import EmojiPicker from "./emoji-picker";
import Card from "@material-ui/core/Card";

const styles = (theme: Theme) =>
    createStyles({
        panel: {
            padding: "0 15px",
        },
        messageBox: {
            backgroundColor: lighten(theme.constants.appBackgroundHighlight, 0.13),
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: 4,
            width: "100%",
            padding: "3px 10px",
            margin: "10px 15px",
            overflow: "auto",
            minHeight: 35,
            maxHeight: 175,
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
    <IconButton className={classes.iconButton} {...props}>
        <Icon className={classes.icon} />
    </IconButton>
));

type MessageLineProps = MuiStyles & { sendMessage: (value: string) => void };

function NewMessageLine({ classes, sendMessage }: MessageLineProps) {
    const [messageText, setMessageText] = useState<string>("");
    const [showEmojiPicker, setEmojiPickerOpen] = useState<boolean>(false);

    const toggleEmojiPicker = () => setEmojiPickerOpen((prevState) => !prevState);

    const onSubmit = useCallback(
        (e?: React.FormEvent) => {
            if (e) e.preventDefault();
            sendMessage(messageText);
            setMessageText("");
        },
        [sendMessage, messageText]
    );

    const handleKeyboardShortcuts = useCallback(
        (e: KeyboardEvent) => {
            // [CTRL + Enter]: Send message
            if (e.key === "Enter" && e.ctrlKey && !e.shiftKey) {
                onSubmit();
                setMessageText("");
            }
            // [CTRL + E]: Toggle emoji picker
            if (e.key === "e" && e.ctrlKey) {
                e.preventDefault();
                toggleEmojiPicker();
            }
        },
        [onSubmit]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboardShortcuts);
        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcuts);
        };
    }, [handleKeyboardShortcuts]);

    return (
        <PanelBottomBar className={classes.panel}>
            <CustomButton icon={EmojiIcon} title="Add Emoji" onClick={toggleEmojiPicker} />
            {showEmojiPicker && <EmojiPicker editMessage={setMessageText} closePicker={toggleEmojiPicker} />}
            <Card className={classes.messageBox}>
                <TextField
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className={classes.input}
                    focused
                    multiline
                    InputProps={{ disableUnderline: true }}
                    placeholder="Write a message here..."
                />
            </Card>
            <CustomButton onClick={onSubmit} icon={SendIcon} title="Send Message" />
        </PanelBottomBar>
    );
}

export default withStyles(styles)(NewMessageLine);
