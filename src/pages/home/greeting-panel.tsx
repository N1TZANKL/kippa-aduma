import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { mdiEmoticonCool, mdiWhiteBalanceSunny, mdiRedhat, mdiRobotExcited } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";
import Panel, { PanelSubtitle, PanelTitle } from "src/components/general/Panel";
import { getTodaysData } from "src/utils/helpers/dates";
import { spaceChildren } from "src/utils/helpers/css";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "space-evenly",
        },
        titleWrapper: {
            flexDirection: "column",
        },
        center: {
            display: "flex",
            alignItems: "center",
        },
        icon: {
            marginLeft: 7,
        },
        actionsText: {
            display: "flex",
            alignItems: "center",
            ...spaceChildren("horizontally", 7),
        },
        actions: {
            marginLeft: 15,
            ...spaceChildren("horizontally", 8),
        },
    });

const GREETINGS: [string, string][] = [
    ["Hello", mdiWhiteBalanceSunny],
    ["Howdy", mdiRedhat],
    ["Hey there", mdiEmoticonCool],
    ["Happy to see you", mdiRobotExcited],
];

function getRandomGreeting() {
    const greetingIndex = Math.ceil(Math.random() * 4) - 1;
    return GREETINGS[greetingIndex];
}

type GreetingPanelProps = MuiStyles & { user: UserSessionObject; className: string };

function GreetingPanel({ classes, className, user }: GreetingPanelProps) {
    const [text, icon] = getRandomGreeting();
    return (
        <Panel className={clsx(className, classes.root)}>
            <span className={clsx(classes.center, classes.titleWrapper)}>
                <Typography variant="caption" color="textSecondary" align="center">
                    {getTodaysData()}
                </Typography>
                <PanelTitle className={classes.center}>
                    {text}, {user.nickname}!
                    <SvgIcon className={classes.icon}>
                        <path d={icon} />
                    </SvgIcon>
                </PanelTitle>
            </span>
            <span className={classes.center}>
                <div className={classes.actionsText}>
                    <PanelSubtitle>Quick Actions</PanelSubtitle> <PanelSubtitle noUnderline>{">"}</PanelSubtitle>
                </div>
                <div className={classes.actions}>
                    <Button variant="outlined" size="small">
                        Add Credential
                    </Button>
                    <Button variant="outlined" size="small">
                        Write Post
                    </Button>
                    <Button variant="outlined" size="small">
                        Create Task
                    </Button>
                </div>
            </span>
        </Panel>
    );
}

export default withStyles(styles)(GreetingPanel);
