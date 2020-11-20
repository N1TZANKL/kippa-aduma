import React, { useCallback, useEffect, useState } from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/InsertEmoticon";
import Card from "@material-ui/core/Card";

import { MuiStyles } from "interfaces";
import TextField from "components/general/TextField";
import { PanelBottomBar } from "components/general/Panel";
import IconButton from "components/general/IconButton";

import EmojiPicker from "./emoji-picker";

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
    });

type MessageLineProps = MuiStyles & { sendMessage: (value: string) => void };

function NewMessageLine({ classes, sendMessage }: MessageLineProps) {
    const [messageText, setMessageText] = useState<string>("");
    const [showEmojiPicker, setEmojiPickerOpen] = useState<boolean>(false);

    const toggleEmojiPicker = () => setEmojiPickerOpen((prevState) => !prevState);
    const clearInput = () => setMessageText("");

    const onSubmit = useCallback(
        (e?: React.FormEvent) => {
            if (e) e.preventDefault();
            sendMessage(messageText);
            clearInput();
        },
        [sendMessage, messageText]
    );

    const handleKeyboardShortcuts = useCallback(
        (e: KeyboardEvent) => {
            // [CTRL + Enter]: Send message
            if (e.key === "Enter" && e.ctrlKey && !e.shiftKey) {
                onSubmit();
                clearInput();
            }
            // [CTRL + E]: Toggle emoji picker
            else if (e.key === "e" && e.ctrlKey) {
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
            <IconButton icon={EmojiIcon} title="Add Emoji" onClick={toggleEmojiPicker} p={6} />
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
            <IconButton onClick={onSubmit} icon={SendIcon} title="Send Message" p={6} />
        </PanelBottomBar>
    );
}

export default withStyles(styles)(NewMessageLine);
