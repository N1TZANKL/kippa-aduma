import React, { useState, useContext } from "react";
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { Task } from "src/utils/interfaces";
import DialogBase from "src/components/general/DialogBase";
import DeleteButton from "src/components/forms/DeleteButton";
import { formatDate } from "src/utils/helpers/dates";
import { TaskStatuses } from "server/db/task/model";
import DataTypeText from "src/components/general/DataTypeText";
import UserListItem from "src/components/general/UserListItem";
import ConfirmationDialog from "src/components/dialogs/ConfirmationDialog";
import { SubmitButton } from "src/components/forms";
import { spaceChildren } from "src/utils/helpers/css";
import { Delete } from "src/utils/helpers/api";
import TasksContext from "src/pages/tasks/context";
import { UserSessionObject } from "utils/session";

import { STATUS_TO_CHANGED_TIMESTAMP_MEANING, STATUS_TO_TEXT } from "./task-utils";
import CreateTaskForm, { EditableTask } from "./create-task-form";

const styles = (theme: Theme) =>
    createStyles({
        content: {
            display: "flex",
            flexDirection: "column",
            padding: 25,
            backgroundColor: theme.constants.appBackgroundHighlight,
        },
        infoGrid: {
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "125px 1fr",
            "& > *": { marginBottom: 10 },
        },
        borderTop: {
            paddingTop: 20,
            marginTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.1)",
        },
        buttons: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            ...spaceChildren("horizontally", 10),
        },
    });

const infoPairStyles = createStyles({
    title: {
        fontWeight: "bold",
        fontFamily: "Inconsolata",
    },
    noInfo: {
        fontStyle: "italic",
    },
    info: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
});

type InfoPairProps = WithStyles<typeof infoPairStyles> & { title: string; info?: React.ReactNode };

const InfoPair = withStyles(infoPairStyles)(({ classes, title, info }: InfoPairProps) => (
    <>
        <Typography className={classes.title}>{title}:</Typography>
        {info ? (
            <Typography component="div" className={classes.info}>
                {info}
            </Typography>
        ) : (
            <Typography color="textSecondary" className={classes.noInfo}>
                (None)
            </Typography>
        )}
    </>
));

type TaskInfoDialogProps = WithStyles<typeof styles> & {
    task?: Task;
    onClose: () => void;
};

function TaskInfoDialog({ classes, task, onClose }: TaskInfoDialogProps) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const { deleteTask } = useContext(TasksContext);

    async function onConfirmDelete() {
        if (!task) return;

        onClose();

        const res = await Delete("task", { id: task.id });
        if (res.ok) deleteTask(task.id);
    }

    function editModeOnClose() {
        setEditMode(false);
        onClose();
    }

    return (
        <>
            <DialogBase
                title={`Task Info ${isEditMode ? "(Edit Mode)" : ""}`}
                open={Boolean(task?.id)}
                onClose={isEditMode ? editModeOnClose : onClose}
            >
                {task && (
                    <>
                        <DialogContent className={classes.content}>
                            {isEditMode ? (
                                <CreateTaskForm onClose={editModeOnClose} editedTask={task as EditableTask} />
                            ) : (
                                <>
                                    <div className={classes.infoGrid}>
                                        <InfoPair title="Description" info={task.description} />
                                        <InfoPair title="More Info" info={task.additionalInformation} />
                                    </div>
                                    <div className={clsx(classes.infoGrid, classes.borderTop)}>
                                        <InfoPair title="Status" info={<DataTypeText>{STATUS_TO_TEXT[task.status]}</DataTypeText>} />
                                        <InfoPair title="Created By" info={<UserListItem {...task.creator} avatarSize={25} />} />
                                        {task.status !== TaskStatuses.TODO && (
                                            <InfoPair
                                                title="Assigned To"
                                                info={<UserListItem {...(task.assignee as UserSessionObject)} avatarSize={25} />}
                                            />
                                        )}
                                        <InfoPair
                                            title={`${STATUS_TO_CHANGED_TIMESTAMP_MEANING[task.status]} At`}
                                            info={formatDate(task.changedAt, true)}
                                        />
                                        {task.status !== TaskStatuses.TODO && <InfoPair title="Deadline" info={formatDate(task.deadlineAt)} />}
                                    </div>
                                    <div className={classes.buttons}>
                                        {task.status !== TaskStatuses.DONE && (
                                            <SubmitButton noMargin isSubmitting={false} onClick={() => setEditMode(true)}>
                                                Edit Task
                                            </SubmitButton>
                                        )}
                                        <DeleteButton onClick={() => setDeleteDialogOpen(true)}>Delete Task</DeleteButton>
                                    </div>
                                </>
                            )}
                        </DialogContent>
                    </>
                )}
            </DialogBase>
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={onConfirmDelete}
                confirmText="Yes, Delete"
            >
                Are you sure you want to delete this task? This action is irreversible!
            </ConfirmationDialog>
        </>
    );
}

export default withStyles(styles)(TaskInfoDialog);
