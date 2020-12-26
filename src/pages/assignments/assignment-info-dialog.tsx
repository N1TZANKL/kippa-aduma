import React, { useState, useContext } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { Assignment, MuiStyles } from "src/utils/interfaces";
import DialogBase from "src/components/general/DialogBase";
import DeleteButton from "src/components/forms/DeleteButton";
import { formatDate } from "src/utils/helpers/dates";
import { AssignmentStatuses } from "server/db/assignment/model";
import DataTypeText from "src/components/general/DataTypeText";
import UserListItem from "src/components/general/UserListItem";
import ConfirmationDialog from "src/components/dialogs/ConfirmationDialog";
import { SubmitButton } from "src/components/forms";
import { spaceChildren } from "src/utils/helpers/css";
import { Delete } from "src/utils/helpers/api";
import AssignmentsContext from "src/pages/assignments/context";

import { STATUS_TO_CHANGED_TIMESTAMP_MEANING, STATUS_TO_TEXT } from "./assignment-utils";
import CreateAssignmentForm from "./create-assignment-form";

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

type InfoPairProps = MuiStyles & { title: string; info?: React.ReactChild };

const InfoPair = withStyles(styles)(({ classes, title, info }: InfoPairProps) => (
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

type AssignmentInfoDialogProps = MuiStyles & {
    assignment?: Assignment;
    onClose: () => void;
};

function AssignmentInfoDialog({ classes, assignment, onClose }: AssignmentInfoDialogProps) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const { deleteAssignment } = useContext(AssignmentsContext);

    async function onConfirmDelete() {
        if (!assignment) return;

        onClose();

        const res = await Delete("assignment", { id: assignment.id });
        if (res.ok) deleteAssignment(assignment.id);
    }

    function editModeOnClose() {
        setEditMode(false);
        onClose();
    }

    return (
        <>
            <DialogBase
                title={`Assignment Info ${isEditMode ? "(Edit Mode)" : ""}`}
                open={Boolean(assignment?.id)}
                onClose={isEditMode ? editModeOnClose : onClose}
            >
                {assignment && (
                    <>
                        <DialogContent className={classes.content}>
                            {isEditMode ? (
                                <CreateAssignmentForm onClose={editModeOnClose} editedAssignment={assignment} />
                            ) : (
                                <>
                                    <div className={classes.infoGrid}>
                                        <InfoPair title="Description" info={assignment.description} />
                                        <InfoPair title="More Info" info={assignment.additionalInformation} />
                                    </div>
                                    <div className={clsx(classes.infoGrid, classes.borderTop)}>
                                        <InfoPair title="Status" info={<DataTypeText>{STATUS_TO_TEXT[assignment.status]}</DataTypeText>} />
                                        <InfoPair title="Created By" info={<UserListItem {...assignment.creator} avatarSize={25} />} />
                                        {assignment.status !== AssignmentStatuses.TODO && (
                                            <InfoPair title="Assigned To" info={<UserListItem {...assignment.assignee} avatarSize={25} />} />
                                        )}
                                        <InfoPair
                                            title={`${STATUS_TO_CHANGED_TIMESTAMP_MEANING[assignment.status]} At`}
                                            info={formatDate(assignment.changedAt, true)}
                                        />
                                        {assignment.status !== AssignmentStatuses.TODO && (
                                            <InfoPair title="Deadline" info={formatDate(assignment.deadlineAt)} />
                                        )}
                                    </div>
                                    <div className={classes.buttons}>
                                        {assignment.status !== AssignmentStatuses.DONE && (
                                            <SubmitButton noMargin isSubmitting={false} onClick={() => setEditMode(true)}>
                                                Edit Assignment
                                            </SubmitButton>
                                        )}
                                        <DeleteButton onClick={() => setDeleteDialogOpen(true)}>Delete Assignment</DeleteButton>
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
                Are you sure you want to delete this assignment? This action is irreversible!
            </ConfirmationDialog>
        </>
    );
}

export default withStyles(styles)(AssignmentInfoDialog);
