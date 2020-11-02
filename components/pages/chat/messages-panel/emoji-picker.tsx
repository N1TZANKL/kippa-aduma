import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Picker } from "emoji-mart";
import { MuiStyles } from "interfaces";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            bottom: 48,
            left: 32,
            zIndex: 10,
        },
        closeButton: {
            position: "absolute",
            margin: "-13px 0 0 -13px",
            cursor: "pointer",
            backgroundColor: theme.constants.appBackgroundHighlight,
            borderRadius: "50%",
            padding: 4,
            border: `2px solid ${theme.constants.appBackground}`,
            fontSize: 28,
        },
        "@global": {
            ".emoji-mart": {
                backgroundColor: theme.constants.appBackground,
                borderWidth: 0,
                "& *": {
                    outline: "none !important",
                },
            },
            ".emoji-mart-search > input": {
                backgroundColor: "transparent !important",
                color: "white !important",
                border: "1px solid rgba(255,255,255,0.2) !important",
                margin: "8px 0 5px",
            },
            ".emoji-mart-category-label > span": {
                backgroundColor: `${theme.constants.appBackground} !important`,
                fontSize: 13,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5) !important",
            },
            ".emoji-mart-anchor-selected": {
                color: `${theme.palette.primary.main} !important`,
            },
            ".emoji-mart-anchor-bar": {
                backgroundColor: `${theme.palette.primary.main} !important`,
            },
            ".emoji-mart-bar": {
                borderColor: "rgba(255,255,255,0.2) !important",
            },
            ".emoji-mart-emoji:hover::before": {
                backgroundColor: `${theme.constants.appBackgroundHighlight} !important`,
            },
            ".emoji-mart-emoji": {
                "& > span": {
                    backgroundImage: 'url("/images/emojis.png") !important', // so that the emojis will work offline. :D
                },
            },
        },
    });

type EmojiPickerProps = MuiStyles & { editMessage: Function; closePicker: () => void };
function EmojiPicker({ classes, editMessage, closePicker }: EmojiPickerProps) {
    return (
        <div className={classes.root}>
            <Picker
                emoji=""
                theme="dark"
                showPreview={false}
                showSkinTones={false}
                perLine={7}
                onSelect={(emoji) => editMessage((prevValue: string) => prevValue + emoji.colons)}
                emojiTooltip
            />
            <CloseIcon className={classes.closeButton} onClick={closePicker} />
        </div>
    );
}

export default withStyles(styles)(EmojiPicker);
