import React, { useEffect, useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import clsx from "clsx";
import { mdiNote } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";
import Skeleton from "@material-ui/lab/Skeleton";

import { MuiStyles, Task } from "src/utils/interfaces";
import Panel, { PanelTitle } from "src/components/general/Panel";
import { sortObjectArrayByDate } from "src/utils/helpers/dates";
import { repeatElement } from "src/utils/helpers/jsx";
import { replaceLineBreaksWithSymbol } from "src/utils/helpers/strings";
import { notLastChild, spaceChildren } from "src/utils/helpers/css";
import { Get } from "src/utils/helpers/api";
import { TaskStatuses } from "server/db/task/model";
import { STATUS_TO_TEXT } from "src/pages/tasks/task-utils";
import UserAvatar from "src/components/general/UserAvatar";
import { UserSessionObject } from "utils/session";

const styles = () =>
    createStyles({
        root: {
            justifyContent: "flex-start !important",
            padding: "20px 20px 12px !important",
            position: "relative",
        },
        tasksWrapper: {
            width: "100%",
            padding: "0 10px",
            overflowY: "auto",
            maxHeight: "80%",
            ...notLastChild({
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }),
        },
        task: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0",
        },
        buttonGroup: {
            marginLeft: 12,
        },
        center: {
            display: "flex",
            alignItems: "center",
        },
        title: {
            margin: "5px 0",
        },
        selectedStatus: {
            backgroundColor: "rgba(255,255,255,0.2)",
        },
        taskText: {
            marginLeft: 8,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        taskTextWrapper: {
            maxWidth: "70%",
        },
        user: {
            marginLeft: 8,
            display: "flex",
            alignItems: "center",
            ...spaceChildren("horizontally", 6),
        },
    });

const TaskUser = withStyles(styles)(({ user, type, classes }: MuiStyles & { user: UserSessionObject; type: string }) => (
    <div title={`${type}: ${user.nickname}`} className={classes.user}>
        <span>{type}:</span>
        <UserAvatar {...user} variant="circle" size={24} />
    </div>
));

type StatusToggleButtonsProps = MuiStyles & { selected: TaskStatuses; setSelected: (newStatus: TaskStatuses) => void };
const StatusToggleButtons = withStyles(styles)(({ classes, selected, setSelected }: StatusToggleButtonsProps) => (
    <ButtonGroup variant="outlined" size="small" className={classes.buttonGroup}>
        {Object.values(TaskStatuses).map((status) => (
            <Button key={status} className={clsx(selected === status && classes.selectedStatus)} onClick={() => setSelected(status)}>
                {STATUS_TO_TEXT[status]}
            </Button>
        ))}
    </ButtonGroup>
));

type TasksPanelProps = MuiStyles & { className: string };

function TasksPanel({ classes, className }: TasksPanelProps) {
    const [selectedStatus, setSelectedStatus] = useState<TaskStatuses>(TaskStatuses.IN_PROGRESS);

    const [tasks, setTasks] = useState<Task[] | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await Get("task");
            const data = await res.json();
            setTasks(sortObjectArrayByDate<Task>(data, "changedAt", "desc"));
        };
        fetchTasks();
    }, []);

    return (
        <Panel className={clsx(className, classes.root)}>
            <PanelTitle className={clsx(classes.center, classes.title)}>
                Tasks Overview:
                <StatusToggleButtons selected={selectedStatus} setSelected={setSelectedStatus} />
            </PanelTitle>
            <div className={classes.tasksWrapper}>
                {tasks ? (
                    tasks
                        .filter((t) => t.status === selectedStatus)
                        .map((task) => (
                            <div key={task.id} className={classes.task}>
                                <span className={clsx(classes.center, classes.taskTextWrapper)}>
                                    <SvgIcon fontSize="small">
                                        <path d={mdiNote} />
                                    </SvgIcon>
                                    <span className={classes.taskText}>{replaceLineBreaksWithSymbol(task.description)}</span>
                                </span>
                                <span className={classes.center}>
                                    <TaskUser type="Reporter" user={task.creator} />
                                    {task.assignee && <TaskUser type="Assignee" user={task.assignee} />}
                                </span>
                            </div>
                        ))
                ) : (
                    <div>{repeatElement(<Skeleton height="35px" />, 4)}</div>
                )}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(React.memo(TasksPanel));
