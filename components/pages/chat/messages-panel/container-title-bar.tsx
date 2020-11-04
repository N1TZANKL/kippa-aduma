import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { MuiStyles } from "interfaces";
import { PanelTitle } from "components/general/Panel";

import { CustomButton } from "./new-message-line";

const styles = () =>
    createStyles({
        root: {
            pointerEvents: "none",
            userSelect: "none",
            height: 50,
            display: "flex",
            alignItems: "center",
            padding: "0 10px 0 20px",
            justifyContent: "space-between",
            overflow: "hidden",
        },
    });

function ContainerTitleBar({ classes }: MuiStyles) {
    return (
        <PanelTitle className={classes.root} withBackground>
            Group Chat
            <CustomButton icon={AttachFileIcon} title="Send File" />
        </PanelTitle>
    );
}

export default withStyles(styles)(ContainerTitleBar);
