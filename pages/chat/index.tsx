import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import PageLayout from "components/PageLayout";
import ChatBubble from "components/ChatBubble";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            minWidth: 1250,
            height: "100%",
            minHeight: 600,
            padding: 20,
            "& > *:not(:last-child)": {
                marginRight: 15,
            },
        },
        panel: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            borderRadius: 2,
        },
        leftPanel: {
            flexBasis: "25%",
            minWidth: 300,
            height: "100%",
        },
        rightPanel: {
            flexBasis: "75%",
            minWidth: 900,
            height: "100%",
        },
        messagesContainer: {
            display: "flex",
            flexDirection: "column",
            padding: 15,
            boxSizing: "border-box",
            height: "100%",
        },
    });

function Chat(props: MuiStyles) {
    const { classes } = props;

    return (
        <PageLayout noPadding>
            <div className={classes.root}>
                <Paper className={clsx(classes.panel, classes.leftPanel)}>(enter users list here)</Paper>
                <Paper className={clsx(classes.panel, classes.rightPanel)}>
                    <div className={classes.messagesContainer}>
                        <ChatBubble
                            message={{
                                type: "text",
                                message: "just a test\nlalalalla\nlalalla",
                                color: "purple",
                                nickname: "nitz",
                                timestamp: new Date().toISOString(),
                            }}
                        />
                        <ChatBubble
                            message={{
                                type: "file",
                                message: "thisisalongfilenameohmygoddddditsgonnaoverflow.tar.gz",
                                fileSize: 3201230,
                                color: "red",
                                nickname: "redhood",
                                timestamp: new Date().toISOString(),
                                fileType: "tar.gz",
                            }}
                        />
                        <ChatBubble
                            message={{
                                type: "file",
                                message: "test.txt",
                                fileSize: 400,
                                color: "purple",
                                nickname: "nitz",
                                timestamp: new Date().toISOString(),
                                fileType: "txt",
                            }}
                        />
                    </div>
                </Paper>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Chat);
