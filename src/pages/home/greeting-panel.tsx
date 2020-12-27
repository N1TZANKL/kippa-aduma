import React, { useEffect, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { mdiEmoticonCool, mdiWhiteBalanceSunny, mdiRedhat, mdiRobotExcited, mdiKeyPlus, mdiNotebookEdit, mdiNotePlus } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";
import { UserSessionObject } from "utils/session";
import Panel, { PanelSubtitle, PanelTitle, PanelButton } from "src/components/general/Panel";
import { getTodaysData } from "src/utils/helpers/dates";
import { spaceChildren } from "src/utils/helpers/css";
import FormDialog from "src/components/dialogs/FormDialog";

import CreatePostForm from "../operations/create-post-form";
import CreateCredForm from "../creds/create-cred-form";
import CreateTaskForm from "../tasks/create-task-form";
import TasksContext from "../tasks/context";

const styles = () =>
    createStyles({
        root: {
            padding: "15px 15px 0px",
        },
        titleWrapper: {
            flexDirection: "column",
            marginBottom: 25,
        },
        wrap: {
            justifyContent: "center",
            flexWrap: "wrap",
            wordBreak: "break-word",
        },
        center: {
            display: "flex",
            alignItems: "center",
        },
        icon: {
            marginLeft: 7,
            display: "inline-block",
        },
        actionsText: {
            display: "flex",
            alignItems: "center",
            ...spaceChildren("horizontally", 7),
            paddingBottom: 10,
        },
        actions: {
            display: "flex",
            marginLeft: 15,
            paddingBottom: 15,
            ...spaceChildren("horizontally", 12),
        },
    });

const UPDATE_INTERVAL = 1000 * 15;

enum SupportedQuickActions {
    ADD_CREDENTIAL = "Add Credential",
    WRITE_POST = "Write Post",
    CREATE_TASK = "Create Task",
}

const ActionToIcon: Record<SupportedQuickActions, string> = {
    [SupportedQuickActions.ADD_CREDENTIAL]: mdiKeyPlus,
    [SupportedQuickActions.WRITE_POST]: mdiNotebookEdit,
    [SupportedQuickActions.CREATE_TASK]: mdiNotePlus,
};

function useRandomGreeting(): [string, string, () => void] {
    const getRandomIndex = () => Math.ceil(Math.random() * 4) - 1;

    const [greetingIndex, setGreetingIndex] = useState(getRandomIndex());

    const refreshGreeting = () => setGreetingIndex(getRandomIndex());

    const GREETINGS: [string, string][] = [
        ["Hello", mdiWhiteBalanceSunny],
        ["Howdy", mdiRedhat],
        ["Hey there", mdiEmoticonCool],
        ["Happy to see you", mdiRobotExcited],
    ];

    return [...GREETINGS[greetingIndex], refreshGreeting];
}

function useQuickAction(users: UserSessionObject[], user: UserSessionObject): [(action: SupportedQuickActions) => void, React.ReactNode] {
    const ActionToFormComponent: Record<SupportedQuickActions, JSX.Element> = {
        [SupportedQuickActions.ADD_CREDENTIAL]: <CreateCredForm />,
        [SupportedQuickActions.WRITE_POST]: <CreatePostForm />,
        [SupportedQuickActions.CREATE_TASK]: (
            <TasksContext.Provider value={{ users, user }}>
                <CreateTaskForm />
            </TasksContext.Provider>
        ),
    };

    const [openFormTitle, setOpenFormTitle] = useState<SupportedQuickActions | null>(null);

    const DialogComponent = openFormTitle
        ? () => (
              <FormDialog open title={openFormTitle} onClose={() => setOpenFormTitle(null)}>
                  {ActionToFormComponent[openFormTitle]}
              </FormDialog>
          )
        : null;

    return [setOpenFormTitle, DialogComponent];
}

type GreetingPanelProps = MuiStyles & { users: UserSessionObject[]; user: UserSessionObject; className: string };

function GreetingPanel({ classes, className, user, users }: GreetingPanelProps) {
    const [currentTime, setCurrentTime] = useState(getTodaysData());
    const [greeting, greetingIcon, getNewGreeting] = useRandomGreeting();
    const [setAction, OpenFormDialog] = useQuickAction(users, user);

    // update time every interval
    useEffect(() => {
        const intervalHandler = setInterval(() => {
            setCurrentTime(getTodaysData());
            getNewGreeting();
        }, UPDATE_INTERVAL);
        return () => clearInterval(intervalHandler);
    }, [getNewGreeting]);

    return (
        <>
            <Panel className={clsx(className, classes.root)}>
                <span className={clsx(classes.center, classes.titleWrapper)}>
                    <Typography variant="caption" color="textSecondary" align="center">
                        {currentTime}
                    </Typography>
                    <PanelTitle className={clsx(classes.center, classes.wrap)}>
                        {`${greeting}, ${user.nickname}!`}
                        <SvgIcon className={classes.icon}>
                            <path d={greetingIcon} />
                        </SvgIcon>
                    </PanelTitle>
                </span>
                <span className={clsx(classes.center, classes.wrap)}>
                    <div className={classes.actionsText}>
                        <PanelSubtitle>Quick Actions</PanelSubtitle> <PanelSubtitle noUnderline>{">"}</PanelSubtitle>
                    </div>
                    <div className={classes.actions}>
                        {Object.entries(ActionToIcon).map(([action, icon]) => (
                            <PanelButton key={action} variant="outlined" size="small" onClick={() => setAction(action as SupportedQuickActions)}>
                                <SvgIcon>
                                    <path d={icon} />
                                </SvgIcon>
                                {action}
                            </PanelButton>
                        ))}
                    </div>
                </span>
            </Panel>
            {OpenFormDialog && <OpenFormDialog />}
        </>
    );
}

export default withStyles(styles)(GreetingPanel);
