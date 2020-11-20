import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { MuiStyles } from "interfaces";
import { PanelTitle } from "components/general/Panel";
import IconButton from "components/general/IconButton";

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
            <IconButton icon={AttachFileIcon} title="Send File" p={6} />
        </PanelTitle>
    );
}

export default withStyles(styles)(ContainerTitleBar);
