import React, { useRef } from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Paper from "@material-ui/core/Paper";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconComponent } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/InsertEmoticon";
import TextField from "components/general/TextField";

const styles = (theme: Theme) =>
    createStyles({
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
    <IconButton className={classes.iconButton} {...props} children={<Icon className={classes.icon} />} />
));

type MessageLineProps = MuiStyles & { className: string; sendMessage: Function };

function NewMessageLine(props: MessageLineProps) {
    const { classes, sendMessage } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    function _onClickSend(e: Event) {
        e.preventDefault();
        sendMessage(inputRef.current!.value);
        inputRef.current!.value = "";
    }

    return (
        <Paper className={props.className}>
            <form onSubmit={_onClickSend} className={classes.flex}>
                <CustomButton icon={EmojiIcon} title="Add Emoji" />
                <div className={classes.messageBox}>
                    <TextField
                        inputRef={inputRef}
                        className={classes.input}
                        focused
                        multiline
                        rowsMax={3}
                        InputProps={{ disableUnderline: true }}
                        placeholder={"Write a message here..."}
                    />
                </div>
                <CustomButton type="submit" icon={SendIcon} title="Send Message" />
            </form>
        </Paper>
    );
}

export default withStyles(styles)(NewMessageLine);
